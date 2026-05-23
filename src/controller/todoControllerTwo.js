import todoSchemaTwo from "../models/todoSchemaTwo.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const createTodo = await todoSchemaTwo.create({
      title: title,
      userID: req.userID,
    });
    console.log("todo Created", createTodo);
    return res.status(201).json({
      success: true,
      message: "Todo Created Successfully",
      data: createTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};
