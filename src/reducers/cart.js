export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    REMOVE_ONE_ITEM_FROM_CART:'REMOVE_ONE_ITEM_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
  }

  
// update localStorage with state for cart
export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }

  const UPDATE_STATE_BY_ACTION = {
    [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
        // console.log("action ese")
        // console.log(action.payload)
      const { _id } = action.payload
      //console.log(_id);
      //check si el producto ya está
      const productInCartIndex=state.findIndex(item=> item._id === _id)
      //console.log("devuelve" + productInCartIndex);

  
      if (productInCartIndex >= 0) {
        // 👀 una forma sería usando structuredClone
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1
  
        // 👶 usando el map
        // const newState = state.map(item => {
        //   if (item.id === id) {
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     }
        //   }
  
        //   return item
        // })
  
        // ⚡ usando el spread operator y slice
        const newState = [
          ...state.slice(0, productInCartIndex),
          { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
          ...state.slice(productInCartIndex + 1)
        ]
  
        updateLocalStorage(newState)
        return newState
      }
  
      const newState = [
        ...state,
        {
          ...action.payload, // product
          quantity: 1
        }
      ]
  
      updateLocalStorage(newState)
      return newState
    },
    [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
        const { _id } = action.payload;
        const productInCartIndex = state.findIndex(item => item._id === _id);
    
        if (productInCartIndex >= 0) {
            const updatedQuantity = state[productInCartIndex].quantity - 1;
            
            // Verificar si la cantidad es mayor que 1 antes de actualizar
            if (updatedQuantity > 0) {
                const newState = [
                    ...state.slice(0, productInCartIndex),
                    { ...state[productInCartIndex], quantity: updatedQuantity },
                    ...state.slice(productInCartIndex + 1)
                ];
    
                updateLocalStorage(newState);
                return newState;
            } else {
                // Si la cantidad es 1, eliminamos el producto del carrito
                const newState = [
                    ...state.slice(0, productInCartIndex),
                    ...state.slice(productInCartIndex + 1)
                ];
    
                updateLocalStorage(newState);
                return newState;
            }
        }
    
        return state; // Retornar estado original si el producto no se encuentra en el carrito
    },
    [CART_ACTION_TYPES.REMOVE_ONE_ITEM_FROM_CART]: (state, action) => {
        console.log("remove one item");
        const { _id } = action.payload;
        const productInCartIndex = state.findIndex(item => item._id === _id);
    
        if (productInCartIndex >= 0) {
            const newState = [
                ...state.slice(0, productInCartIndex),
                ...state.slice(productInCartIndex + 1)
            ];
    
            updateLocalStorage(newState);
            return newState;
        }
    
        return state; // Retornar estado original si el producto no se encuentra en el carrito
    },
    
    [CART_ACTION_TYPES.CLEAR_CART]: () => {
      updateLocalStorage([])
      return []
    }
  }
  
  export const cartReducer = (state, action) => {
    const { type: actionType } = action
    const updateState = UPDATE_STATE_BY_ACTION[actionType]
    return updateState ? updateState(state, action) : state
  }
  