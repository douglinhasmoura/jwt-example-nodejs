import { request, response, Router, } from 'express';
import { uuid } from 'uuidv4';
import { sign } from 'jsonwebtoken';

import auth from '../middleware/auth';


const userRouter = Router();

interface User {
    id: string,
    email: string,
    pwd: string
}

const jwt = {
    secret: '6845c17d298d95aa942127bdad2ceb9b',
    expiresIn: '1d'
}

const user: User = {
    id: uuid(),
    email: 'spiderman@spider.com',
    pwd: 'Spider@2020',
}

const data = [
    {
        id: uuid(),
        description: 'Peter Parker',

    },
    {
        id: uuid(),
        description: 'Harry Osborn',
        
    },
    {
        id: uuid(),
        description: 'Gwen Stacy',
        
    },
    {
        id: uuid(),
        description: 'Mary Jane Watson',
        
    },
];

userRouter.post('/',  async (request, response) =>{
    
    try {
        
        const userRequest: User = request.body.user;

        if(user.email != userRequest.email){
            throw new Error('User or password incorrect');
        }

        if(user.pwd != userRequest.pwd){
            throw new Error('User or password incorrect');
        }

        const userResponse: User = {
            email: user.email,
            id: user.id,
            pwd: ''
        }

        //inclui o JWT
        const token = sign({}, jwt.secret,{
            subject: user.id,
            expiresIn: jwt.expiresIn
        });

        return response.json({user: userResponse, token: token});
 
    } catch (error) {
        return response.status(400).json({error: error.message});
    }
});

userRouter.get('/', auth, async(request, response) =>{
    return response.json({data: data});
});

export default userRouter;