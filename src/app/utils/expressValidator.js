const { check } = require("express-validator");

module.exports = {
  validators: {
    postValidator: [
      // validate post filds
      check("titulo", "Por favor, insira um título para o seu post")
        .exists()
        .isLength({ min: 1 }) // min 8 chars
        .withMessage("O título deve ter no mínimo 8 caracteres")
        .isLength({ max: 80 }) // max 40 chars
        .withMessage("O título deve ter no máximo 40 caracteres"),
      check("descricao", "Por favor, insira uma descrição para o seu post")
        .exists()
        .isLength({ min: 1 }) // min 10 chars
        .withMessage("A descrição deve ter no mínimo 10 caracteres")
        .isLength({ max: 60 }) // max 60 chars
        .withMessage("A descrição deve ter no máximo 60 caracteres"),
      check("publicado", "Por favor, insira um texto para o seu post")
        .isNumeric( 1 || 0 )
        .exists()
        
    ],
    textlistValidator: [
      check("titulo", "Por favor, insira um título para o seu post")
        .exists()
        .isLength({ min: 1 }) // min 1 chars
        .withMessage("O título deve ter no mínimo 8 caracteres")
        .isLength({ max: 30 }) // max 40 chars
        .withMessage("O título deve ter no máximo 40 caracteres"),
      check("publicado", "Por favor, insira um texto para o seu post")
        .isNumeric( 1 || 0 )
        .exists()
        
    ],
    userValidator: [
      // validate user filds
      check("user_name", "Por favor, insira um nome para o seu usaurio")
        .exists()
        .isLength({ min: 3 }) 
        .withMessage("O seu nome deve ter no mínimo 3 caracteres")
        .isLength({ max: 10 }) 
        .withMessage("O título deve ter no máximo 40 caracteres"),
      check("descricao", "Por favor, insira uma descrição para o seu post")
        .exists()
        .isLength({ min: 3 })
        .withMessage("A descrição deve ter no mínimo 10 caracteres")
        .isLength({ max: 155 }) //
        .withMessage("A descrição deve ter no máximo 155 caracteres"),
      ],
  },
};
