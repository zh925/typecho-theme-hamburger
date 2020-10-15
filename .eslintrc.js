module.exports = {
    'env': {
        'node': true,
        'browser': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 6
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ]
    }
}
