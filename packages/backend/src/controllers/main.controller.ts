import { Request, Response } from 'express';

export const getHelloWorld = (req: Request, res: Response) => {
    res.status(200).send('Hello World!');
}