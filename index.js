
const GetterFactory = (dataObject) => ({
    get: (key) => {
        console.log(`key: ${key} was asked`)
        return dataObject[key]
    }
})

const SetterFactory = (dataObject) => ({
    set: (key, value) => {
        console.log(`key: ${key}, was set with value: ${value}`)
        dataObject[key] = value
    }
})


const BarkFactory = (instance) => ({
    bark: ()=>{
        console.log(`Woof!`)
        let counter = instance.get('counter')
        instance.set('counter', ++counter)
    }
})

const KillFactory = (instance) => ({
    kill: ()=>{
        console.log(`Die!!!`)
        let counter = instance.get('counter')
        instance.set('counter', ++counter)
    }
})
const CleanFactory = (instance) => ({
    clean: ()=>{
        console.log(`cleaning!!!`)
        let counter = instance.get('counter')
        instance.set('counter', ++counter)
    }
})

const InstanceFactory = (initialData, ...deps) => {
    const _instance = {}
    const _data = Object.assign({}, initialData)
    return Object.assign(
        _instance,
        deps.reduce((prev, curr)=>{
            switch(curr.name){
                case 'GetterFactory':
                case 'SetterFactory':
                    Object.assign(prev, curr(_data))
                    break;
                default:
                    Object.assign(prev, curr(_instance))
                    break;
            }
            return prev
        }, {})
    )
}

const instance = InstanceFactory(
    { privateData: true, thisIsCool: true, counter: 0 }, 
    GetterFactory, 
    SetterFactory, 
    BarkFactory,
    KillFactory,
    CleanFactory
)

console.log(instance)
