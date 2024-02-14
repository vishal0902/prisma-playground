"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(username, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email: username,
                password,
                firstName,
                lastName
            },
            select: {
                id: true,
                firstName: true,
                lastName: true
            }
        });
        console.log(res);
    });
}
function updateUser(username, updateUserInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: {
                email: username
            },
            data: {
                firstName: updateUserInfo.firstName,
                lastName: updateUserInfo.lastName
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        });
        console.log("User Updated: ", res);
    });
}
// updateUser("vishal12@gmail.com", {firstName:"Ranju", lastName:"Bhai"})
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findFirst({
            where: {
                email: email
            }
        });
        console.log(res);
    });
}
// getUser("vishal12@gmail.com")
function addTodo(userId, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.create({
            data: {
                userId,
                title,
                description,
                done: false
            }
        });
        console.log(res);
    });
}
// addTodo(1, "Go to gym", "For pushups and squats")
// addTodo(1, "Go to gym 2", "For pushups and squats")
// addTodo(1, "Go to gym 3", "For pushups and squats")
// addTodo(1, "Go to gym 4", "For pushups and squats")
function getTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todo.findMany({
            where: {
                userId: userId
            }
        });
        console.log(res);
    });
}
// getTodos(1)
function getUserAndTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                todos: true
            }
        });
        console.log(res);
    });
}
getUserAndTodos(1);
