import express from 'express';
import { query } from 'express-validator';

const app = express();

app.use(express.json());

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
    next();
};

const resolveIndexByUserID = (request, response, next) => {
    const {
        params: { id },
    } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.sendStatus(400);
    const findUserIndex = mockUser.findIndex((user) => user.id == parsedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next();
};

// app.use(loggingMiddleware);

const PORT = process.env.PORT || 3000;

const mockUser = [
    { id: 1, username: "anson", displayName: "Anson" },
    { id: 2, username: "fahim", displayName: "Fahim" },
    { id: 3, username: "sam", displayName: "Sam" },
    { id: 4, username: "sameer", displayName: "Sameer" },
    { id: 5, username: "sathish", displayName: "sathish" },
    { id: 6, username: "andam", displayName: "andam" },
];

app.get('/', 
    // (request, response, next) => {
    //     console.log("Base URL 1");
    //     next();
    // },
    // (request, response, next) => {
    //     console.log("Base URL 2");
    //     next();
    // },
    // (request, response, next) => {
    //     console.log("Base URL 3");
    //     next();
    // },
    (request, response) => {
    response.status(201).send({ msg: "Hello World" })
});

app.get('/api/users', (request, response) => {
    console.log(request.query)
    const { query: { filter, value } } = request;
    if (!filter && !value) return response.send(mockUser);
    if (filter && value) 
        return response.send(
            mockUser.filter((user) => user[filter].includes(value))
        ); 
});

app.use(loggingMiddleware, (request, response, next) => {
    console.log("Finished Logging...");
    next();
});

app.post('/api/users', (request, response) => {
    console.log(request.body);
    const { body } = request;
    const newUser = {id: mockUser[mockUser.length - 1].id + 1, ...body};
    mockUser.push(newUser);
    return response.status(201).send(newUser);

});

app.get('/api/users/:id', (request, response) => {
    console.log(request.params);
    const parsedId = parseInt(request.params.id);
    console.log(parsedId);
    if (isNaN(parsedId))
        return response.status(400).send({ msg: "Bad Request. Invalid ID" });
    const findUser = mockUser.find((user) => user.id === parsedId);
    if (!findUser)
        return response.status(404).send("Record not Found");
    return response.send(findUser);


});

app.get('/api/products', (request, response) => {
    response.send([
        { id: 123, name: "chicken", price: "$125.4" },
        { id: 13, name: "mutton", price: "$232.4" },
    ]);
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

app.put('/api/users/:id', resolveIndexByUserID, (request, response) => {
    const { body, findUserIndex} = request;
    mockUser[findUserIndex] = { id: mockUser[findUserIndex].id, ...body};
    return response.sendStatus(200);
});

app.patch('/api/users/:id', resolveIndexByUserID, (request, response) => {
    const { body, findUserIndex} = request;
    mockUser[findUserIndex] = { ...mockUser[findUserIndex], ...body};
    return response.sendStatus(200); 
});

app.delete('/api/users/:id', resolveIndexByUserID, (request, response) => {
    const {
        findUserIndex,
    } = request;
    mockUser.splice(findUserIndex, 1);
    return response.sendStatus(200); 
}); 