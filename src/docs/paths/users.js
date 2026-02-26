/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criação de usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado
 */


/**
 * @swagger
 * /users/{id}:
 *  patch:
 *    summary: Atualização de usuário
 *    tags: [Users]
 *    security:
 *      - bearerAuth: [ ]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            
 *    responses:
 *      200:
 *        description: Usuário atualizado com sucesso
 *      400:
 *        description: Email já cadastrado ou sem permissão para atualizar tipo
 */


/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Exclusão de usuário
 *    tags: [Users]
 *    security:
 *      - bearerAuth: [ ]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        description: Usuário excluído com sucesso
 *      403:
 *        description: Sem permissão para excluir este usuário
 */