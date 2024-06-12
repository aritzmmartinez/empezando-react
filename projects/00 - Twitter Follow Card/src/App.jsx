import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'


const users = [
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: true
    },
    {
        userName: 'aritzmmartinez',
        name: 'Aritz Martínez',
        isFollowing: false
    },
    {
        userName: 'emelende',
        name: 'Eneko Melendez',
        isFollowing: true
    }
]

export function App(){
    return (
        <section className='App'>
            {/*
                Las variables booleanas deben ir entre llaves, ya que si no, le estamos pasando un string
                Cuando sea true, se puede poner unicamente la variable
            */}

            {
                // Los props deben ser inmutables
            }
            {/* 
                <TwitterFollowCard userName='midudev' name='Miguel Ángel Durán' isFollowing={true} />
                <TwitterFollowCard userName='aritzmmartinez' name='Aritz Martínez' isFollowing={false} />
                <TwitterFollowCard userName='emelende' name='Eneko Melendez' isFollowing /> 
            */}

            {/*
                En los props se puede pasar un elemento children
                Por ejemplo:
                <TwitterFollowCard userName='firebase' isFollowing={false}>
                    <strong>Firebase</strong>
                </TwitterFollowCard>
            */}

            {/*
                A los componentes se les puede pasar funciones como props
                Por ejemplo:
                const formatUserName = (userName) => `@${userName}`
                <TwitterFollowCard userName='midudev' name='Miguel Ángel Durán' isFollowing={false} formatUserName={formatUserName} />
            */}

            {/*
                A los componentes se les puede pasar elementos como props
                Por ejemplo:
                const element = <strong>Texto en negrita</strong>
                <TwitterFollowCard userName='midudev' name='Miguel Ángel Durán' isFollowing={false} element={element} />
            */}

            {
                // Se puede hacer un map de un array de objetos, el .map() recibe una funcion que recibe un objeto
                // y retorna un componente de React con las propiedades del objeto y sus valores
                users.map(({userName, name, isFollowing}) => {
                    return (
                        <TwitterFollowCard 
                            /* 
                                key es un atributo especial que se usa para identificar los elementos de la lista
                                podria ser un ID de la base de datos, o un nombre de usuario unico
                            */
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    )
}