export const moneyMask = (vlr, showRS = true) => {
    if (!Number(vlr)) return 'R$ 0,00'
    const valor = Number(vlr)
        .toFixed(2)
        .replace(".", ",")
        /* se retirar esse comentario da erro no js */
        //eslint-disable-next-line 
        .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    if (showRS) return `R$ ${valor}`; /* Exibir com  o simbolo R$ */
    return `${valor}`; /* Exibir sem simbolo R$ */
}