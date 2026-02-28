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
 *            
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

/**
 * @swagger
 * /users/{id}:
 *  get:
 *    summary: Obtenção de usuário
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
 *      200:
 *        description: Usuário obtido com sucesso
 *      403:
 *        description: Sem permissão para acessar este usuário
 */


/**
 * @swagger
 * /users/{id}/password:
 *   patch:
 *     summary: Atualização de senha de usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [oldPassword, newPassword]
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       204:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Senha antiga incorreta ou campos faltando
 *       403:
 *         description: Sem permissão para alterar a senha deste usuário
 */

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Listagem de usuários
 *    tags: [Users]
 *    security:
 *      - bearerAuth: [ ]
 *    responses:
 *      200:
 *        description: Usuários listados com sucesso
 *      401:
 *        description: Usuário não autenticado
 */