module.exports = {
    PHONE_VALIDATION: (phone) => {
        const regEx =
            /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/

        return regEx.test(phone)
    },
}