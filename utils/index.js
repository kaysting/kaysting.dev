const crypto = require('crypto');

const utils = {
    getAge: birthDate => {
        const today = new Date();
        const birth = new Date(birthDate);

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    },

    randomHex: (length = 8) => {
        const byteCount = Math.ceil(length / 2);
        return crypto.randomBytes(byteCount).toString('hex').slice(0, length);
    }
};

module.exports = utils;
