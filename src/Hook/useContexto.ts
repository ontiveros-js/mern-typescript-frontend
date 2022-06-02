import {useContext} from 'react'
import {Contexto} from '../context/Context'

export const useContexto = () => {
    return useContext(Contexto)
}