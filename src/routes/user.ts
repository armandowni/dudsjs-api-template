import { Request, Response, Router } from "express";
import { middlewareApi } from "../database/middleware";
import {
  deleteDataUser,
  getDataUser,
  loginUser,
  postDataUser,
  putDataUser,
} from "../actions/user";

const router = Router();
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags: ['API User']
 *     summary: Get data from user
 *     description: Returns data from user.
 *     responses:
 *       200:
 *         description: A successful response with data from user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success get data'
 *               data: {}
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     tags: ['API User']
 *     summary: Login data user
 *     description: Returns data user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response with a data user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success login data'
 *               data: {}
 */

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     tags: ['API User']
 *     summary: Register data user
 *     description: Returns data user.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response with a data user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success register data'
 *               data: {}
 */

/**
 * @swagger
 * /api/v1/user/changeProfile/{id}:
 *   put:
 *     tags: ['API User']
 *     summary: Put a data user
 *     description: Returns a data change user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response with a data changed user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success put data'
 *               data: {}
 */
/**
 * @swagger
 * /api/v1/user/deleteUser/{id}:
 *   delete:
 *     tags: ['API User']
 *     summary: Delete data user
 *     description: Returns a result delete user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response with a data deleted user.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success delete data'
 *               data: {}
 */

router.get("/", getDataUser);
router.post("/login", middlewareApi, loginUser);
router.post("/register", middlewareApi, postDataUser);
router.put("/changeProfile/:id", middlewareApi, putDataUser);
router.delete("/deleteUser/:id", middlewareApi, deleteDataUser);

export const RouterUser = router;
