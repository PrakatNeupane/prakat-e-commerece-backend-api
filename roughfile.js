// refer to this file to understand high order function
const arrayFunction = arrays => index => {
    return arrays[index]
}

const firstArray = arrayFunction([2, 34, 23, 134])
console.log(firstArray(0))

const arrayFunction1 = arrays => {
    const secondfunction = index => {
        return arrays[index]
    }
    return secondfunction
}