import express from "express";
import TaskRoutes from "../api/Task/routes";

const router = express.Router();

router.use("/task", TaskRoutes); 

export default router;