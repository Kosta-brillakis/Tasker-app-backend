import Task from "../models/task"

export const createTask= async (req, res) => {
    try {
        const task = await Task.create({
            task: req.body.content,
            postedBy: req.user._id
        })
        const data = await Task.findById(task._id).populate("postedBy", "name email role _id");
        res.json(data)
    } catch(err) {
        console.log(err)
    }
}

export const getTasks = async (req, res) => {
    try {
        const perPage = 5;
        const page = req.params.page ? req.params.page : 1;

        const tasks = await Task.find().skip((page - 1) * perPage).populate('postedBy', "name email role _id").sort({createdAt: -1}).limit(perPage)
        res.json(tasks)
    } catch (err) {
        console.log(err)
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true}).populate('postedBy', "name email role _id")
        res.json(task)
    } catch (err) {
        console.log(err)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId)
        res.json(task)
    } catch (err) {
        console.log(err)
    }
}

export const taskCount =async (req, res) => {
    try{
        const count = await Task.countDocuments();
        res.json(count);
    } catch (err) {
        console.log(err)
    }
} 