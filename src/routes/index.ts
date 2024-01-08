import { Router } from "express";
import { RouterTest } from "./test";
import { RouterUser } from "./user";

const router = Router();

router.use("/test", RouterTest);
router.use("/user", RouterUser);

export default router;
