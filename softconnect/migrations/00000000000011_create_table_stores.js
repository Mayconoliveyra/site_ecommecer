exports.up = function (knex) {
    return knex.schema
        .createTable("stores", (table) => {
            table.increments("id").primary();

            table.string("nome").notNull();
            table.string("cpf", 14).notNull().defaultTo("000.000.000-00");
            table.string("cnpj", 18).notNull().defaultTo("00.000.000/0000-00");
            table.string("url_logo").notNull();

            table.double("percentual_frete").notNull().defaultTo(0)
            table.double("valor_minimo").notNull().defaultTo(0)

            table.string("resp_nome").notNull().defaultTo("Não informado");
            table.string("resp_contato", 15)

            table.string("cep", 9).notNull();
            table.string("logradouro").notNull();
            table.string("bairro").notNull();
            table.string("localidade").notNull();
            table.string("uf", 2).notNull();
            table.string("numero").notNull();

            table.string("a_whatsapp", 15)
            table.string("a_messenger")
            table.string("a_instagram")
            table.string("a_email")

            table.string("m_facebook")
            table.string("m_instagram")
            table.string("m_twitter")
            table.string("m_yutube")

            table.string("email_user").notNull();
            table.string("email_pass").notNull();
            table.string("email_host").notNull().defaultTo("smtp.gmail.com");
            table.string("email_port").notNull().defaultTo("587");
            table.boolean("email_secure", 1).notNull().defaultTo(0)

            table.boolean("gt_ativo", 1).notNull().defaultTo(0) /* gerencianet */
            table.string("gt_client_id") /* gerencianet */
            table.string("gt_client_secret") /* gerencianet */

            table.string("url_site").notNull().unique();
            table.string("url_server").notNull().unique();
            table.string("client_id").notNull().unique();
            table.string("client_secret").notNull().unique();

            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp("updated_at").defaultTo(knex.raw("NULL ON UPDATE CURRENT_TIMESTAMP"));
            table.timestamp("deleted_at").nullable();
        })
        .then(function () {
            return knex("stores").insert([
                {
                    nome: "Softconnect",
                    url_logo: "https://d2r9epyceweg5n.cloudfront.net/stores/001/448/935/themes/common/logo-678818323-1642765237-494caf53526e230fd98593b4ae0e6a121642765237-320-0.png?0",
                    cpf: "116.751.744-07",
                    cep: "58046-520",
                    logradouro: "Rua Empresário Paulo Miranda d' Oliveira",
                    bairro: "Portal do Sol",
                    localidade: "João Pessoa",
                    uf: "PB",
                    numero: "S/N",

                    a_whatsapp: "(83) 99967-5920",
                    a_messenger: "maycon.deyved",
                    a_instagram: "mayconoliveiradev",
                    a_email: "mayconbrito1998@hotmail.com",
                    m_facebook: "maycon.deyved",
                    m_instagram: "mayconoliveiradev",
                    m_twitter: "maycon1998dev",
                    m_yutube: "UCFCcs3Z5qcn9K4Dap1eF35A",

                    email_user: "softconnectecnologia",
                    email_pass: "rtrbfimmlovhoapd",
                    email_host: "smtp.gmail.com",
                    email_port: "587",
                    email_secure: false,

                    url_site: "http://10.0.0.200:3000",
                    url_server: "http://10.0.0.200:3030",

                    client_id: "H7eH2CuTNjdKUaHsc2aE93tXsNcT94",
                    client_secret: "JLT8LqVeKHHXxrJXiutm6pVxR3eyJS",
                }
            ]);
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("stores");
};
