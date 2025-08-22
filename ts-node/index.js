"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express, { Express, Request, Response } from "express";
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
app.get("/", (req, res) => {
    //res.send("Express + TypeScript Server");
    res.send("Hello Meccc");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
    console.log('Hello World! Am here');
});
