import { Router } from "express";
import { login, refreshToken } from "../controllers/user";

const router = Router();

router.post("/login", login);
router.get("/refresh-token", refreshToken);
export default router;
