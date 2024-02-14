import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()


async function insertUser(username: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
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
    
    })
    console.log(res)
}


// insertUser("raghu@gmail.com","12123123","raghu", "srivastava")



interface UpdateUser {
    firstName: string,
    lastName: string
}


async function updateUser (username: string , updateUserInfo:UpdateUser){
    const res = await prisma.user.update({
        where: {
            email:username
        },
        data: {
            firstName: updateUserInfo.firstName,
            lastName: updateUserInfo.lastName
        },
        select: {
            id: true,
            email: true,
            firstName:true,
            lastName: true
        }
    })

    console.log("User Updated: ", res)
}

// updateUser("vishal12@gmail.com", {firstName:"Ranju", lastName:"Bhai"})


async function getUser(email: string) {
    const res = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    console.log(res);
}

// getUser("vishal12@gmail.com")


async function addTodo(userId:number, title: string, description: string) {
    const res = await prisma.todo.create({
        data: {
            userId,
            title,
            description,
            done: false
        }
    })
    console.log(res)
}

// addTodo(1, "Go to gym", "For pushups and squats")
// addTodo(1, "Go to gym 2", "For pushups and squats")
// addTodo(1, "Go to gym 3", "For pushups and squats")
// addTodo(1, "Go to gym 4", "For pushups and squats")

async function getTodos(userId:number) {
    const res= await prisma.todo.findMany({
        where: {
            userId: userId
        }
    })
    console.log(res)
}

// getTodos(1)

async function getUserAndTodos(userId:number) {
    const res= await prisma.user.findFirst({
        where: {
            id: userId
        },
        select:{
            id: true,
            firstName: true,
            lastName: true,
            todos: true
        }
    })

    console.log(res)
}

getUserAndTodos(1)