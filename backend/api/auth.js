const { KEY_SECRET, LOGIN_AUTH } = require("../.env")
const jwt = require("jwt-simple")

module.exports = app => {
        const { existOrError, utility_console, msgErrorDefault, consultCEP } = app.api.utilities;

        const signinNextAuth = async (req, res) => {
                const body = req.body;
                const modelo = {
                        nome: body.nome,
                        email: body.email,
                }

                try {
                        existOrError(modelo.email, "[email], não poder ser nulo")
                        if (body.secret != LOGIN_AUTH) throw "Token [LOGIN_AUTH] inválido."
                } catch (error) {
                        utility_console({
                                name: "auth.signinNextAuth",
                                error: error,
                        });
                        return res.status(400).send("Desculpe-nos!. Não foi possível realizar o seu cadastro. Por favor, tente novamente utilizando outra opção de cadastro.")
                }

                /* Verifica se o usuari já esta cadastro, se ainda não tiver realiza o cadastro. */
                const isRegistered = await app.db("users").where({ email: modelo.email }).first()
                if (!isRegistered) {
                        await app.db("users").insert(modelo)
                }

                const userFromDb = await app.db("users").where({ email: modelo.email }).first()

                if (userFromDb.bloqueado) {
                        return res.status(400).send("Usuário bloqueado. Entre em contato com a Unidade Gestora")
                }

                const data = Math.floor(Date.now() / 1000)
                const payload = {
                        id: userFromDb.id,
                        nome: userFromDb.nome,
                        email: userFromDb.email,
                        contato: userFromDb.contato,
                        cep: userFromDb.cep,

                        logradouro: userFromDb.logradouro,
                        numero: userFromDb.numero,
                        complemento: userFromDb.complemento,
                        bairro: userFromDb.bairro,
                        localidade: userFromDb.localidade,
                        uf: userFromDb.uf,
                        bloqueado: userFromDb.bloqueado,
                        iat: data, // emitido em
                }

                return res.json({
                        ...payload,
                        token: jwt.encode(payload, KEY_SECRET)
                })
        }

        const save = async (req, res) => {
                const id = req.params.id;
                const body = req.body;
                const modelo = {
                        nome: body.nome,
                        contato: body.contato,
                        cep: body.cep,
                        logradouro: body.logradouro,
                        numero: body.numero,
                        complemento: body.complemento,
                        bairro: body.bairro,
                        localidade: body.localidade,
                        uf: body.uf,
                }

                try {
                        existOrError(modelo.nome, "[nome], não poder ser nulo")
                        existOrError(modelo.contato, "[contato], não poder ser nulo")
                        existOrError(modelo.cep, "[cep], não poder ser nulo")

                } catch (error) {
                        utility_console({
                                name: "auth.save",
                                error: error,
                        });
                        return res.status(400).send(msgErrorDefault)
                }

                const endereco = await consultCEP(modelo.cep)
                res.status(200).send()
        }

        return { save, signinNextAuth }
}