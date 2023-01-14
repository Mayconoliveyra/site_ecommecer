import Head from 'next/head';
import styled from "styled-components"
import { getSession } from "next-auth/react";
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import router from "next/router"
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);

import { Group } from '../../../components/input';

import { proneMask, cepMask } from '../../../../masks';
import { store as saveUser } from '../../api/auth';

const AddressSC = styled.div`
    max-width: 35rem;
    margin: 0 auto;
`
const EnderecoSC = styled.div`
    margin: 0.5rem 0;
    padding: 0 0.3rem;
    >div{
        color: #0F1111;
        [data="h4-title"]{
            border-radius: 0.3rem 0.3rem 0 0;
            border: 1px #D5D9D9 solid;
            padding: 0.6rem 1.5rem;
            h4{
                color: #0F1111;
                font-size: 2rem;
                font-family:${({ theme }) => theme.font.family.bold};
                margin: 0px;
                padding: 0px;
            }
        }
        [data="form"]{
            border: 1px #D5D9D9 solid;
            border-radius: 0 0 0.8rem 0.8rem;
            padding: 0.3rem 0.7rem;

            p{
               margin: 0.5rem;
               font-size: 1rem !important;
               a{
                text-decoration: underline;
                color: #0066c0;
                font-family:${({ theme }) => theme.font.family.medium};
                font-size: 0.9rem !important;
               }
            }
        }
    }
`
const BtnConfirmSC = styled.div`
    [data='button-submit']{
        padding: 0.7rem 1rem;
        border-top: 0.1rem solid #e7e7e7;
        display: flex;
        button{   
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem 0;
            font-size: 1.2rem;
            flex: 1;
            background: #FFD814;
            border-color: #FCD200;
            border-radius: 0.45rem;
            color: #0F1111;

            &:disabled{
                cursor: default;
            }
        }
    }
`

export default function Address({ session }) {
    const scheme = Yup.object().shape({
        contato: Yup.string().nullable().label("Contato").required().length(15, "É necessário informar o número completo no formato (99) 99999-9999"),
        cep: Yup.string().nullable().label("CEP").required().length(9, "É necessário informar um CEP completo."),
        numero: Yup.string().nullable().label("Número da residência"),
        complemento: Yup.string().nullable().label("Complemento(opcional)"),
    });

    return (
        <>
            <Head>
                <title>Endereço de entrega</title>
            </Head>
            <AddressSC>
                <EnderecoSC>
                    <div>
                        <div data="h4-title">
                            <h4>Seu endereço</h4>
                        </div>
                        <Formik
                            validationSchema={scheme}
                            initialValues={session}
                            onSubmit={async (values, setValues) => {
                                await saveUser(values)
                                    .then(() => {
                                        router.reload()
                                    })
                                    .catch((res) => {
                                        /* Se for erro 400, significa que a exibição foi tratada */
                                        if (res && res.response && res.response.status == 400) {
                                            if (res.response.data[400]) {
                                                toast.error(res.response.data[400])
                                            }
                                            setValues.setErrors(res.response.data)
                                            return
                                        }
                                        toast.error("Ops... Não possível realizar a operação. Por favor, tente novamente.")
                                    })
                            }}
                        >
                            {({ errors, touched, dirty, initialValues, values }) => (
                                <Form data="form" action="">
                                    <p>
                                        O preechimento de todas as informações é obrigatório. Entre em contato conosco se tiver dúvidas. <a href="#attendance">Atendimento ao cliente</a>
                                    </p>
                                    <Group
                                        error={!!errors.contato && touched.contato}
                                        label="Contato"
                                        name="contato"
                                        placeholder="Exemplo: (99) 99999-9999"
                                        autocomplete="on"
                                        mask={proneMask}
                                    />
                                    <Group
                                        error={!!errors.cep && touched.cep}
                                        label="CEP"
                                        name="cep"
                                        placeholder="Exemplo: 99999-999"
                                        autocomplete="on"
                                        mask={cepMask}
                                    />
                                    {(values.cep && initialValues.cep == values.cep) && <Group
                                        label="Endereço"
                                        name="logradouro"
                                        disabled
                                    />}
                                    <Group
                                        label="Número da residência(opcional)"
                                        name="numero"
                                        placeholder="Exemplo: 999"
                                        maxLength={55}
                                    />
                                    <Group
                                        label="Complemento(opcional)"
                                        name="complemento"
                                        placeholder="Exemplo: Apto 999 - Bloco 9"
                                        maxLength={55}
                                    />
                                    {(values.cep && initialValues.cep == values.cep) && <Group
                                        label="Bairro"
                                        name="bairro"
                                        disabled
                                    />}
                                    {(values.cep && initialValues.cep == values.cep) && <Group
                                        label="Cidade"
                                        name="localidade"
                                        disabled
                                    />}
                                    {(values.cep && initialValues.cep == values.cep) && < Group
                                        label="Estado"
                                        name="uf"
                                        disabled
                                    />}

                                    <BtnConfirmSC>
                                        <div data='button-submit'>
                                            <button disabled={!dirty} type="submit">
                                                Atualizar
                                            </button>
                                        </div>
                                    </BtnConfirmSC>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </EnderecoSC>
            </AddressSC>
        </>
    )
}

export async function getServerSideProps({ req }) {
    const session = await getSession({ req })

    /* se session ou session.id não existir, redirecionada para tela de login */
    if (!session || !session.id) {
        return {
            redirect: {
                destination: "/login",
                permanent: false
            }
        }
    }

    return {
        props: { session },
    }
}