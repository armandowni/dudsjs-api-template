import { Request, Response, Router } from "express";
import {
  deleteDataTest,
  getDataTest,
  postDataTest,
  putDataTest,
} from "../actions/test";
import { middlewareApi } from "../database/middleware";

const router = Router();
/**
 * @swagger
 * /api/v1/test:
 *   get:
 *     tags: ['API Test']
 *     summary: Get data test
 *     description: Returns a data test.
 *     responses:
 *       200:
 *         description: A successful response with a data test.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success get data'
 *               data: []
 */

/**
 * @swagger
 * /api/v1/test:
 *   post:
 *     tags: ['API Test']
 *     summary: Post a data to test
 *     description: Return result from test.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: A successful response with a data test.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success post data'
 *               data: {}
 */
/**
 * @swagger
 * /api/v1/test/{id}:
 *   put:
 *     tags: ['API Test']
 *     summary: Put a data to test
 *     description: Return result from test.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *     responses:
 *       200:
 *         description: A successful response with a data test.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success put data'
 *               data: {}
 */
/**
 * @swagger
 * /api/v1/test/{id}:
 *   delete:
 *     tags: ['API Test']
 *     summary: Delete a data test
 *     description: Returns a result from delete.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A successful response with a data delete test.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: 'Success delete data'
 *               data: {}
 */

router.get("/", getDataTest);
router.post("/", middlewareApi, postDataTest);
router.put("/:id", middlewareApi, putDataTest);
router.delete("/:id", middlewareApi, deleteDataTest);

export const RouterTest = router;
