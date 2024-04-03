var isAuthenticated=false;

export function setState(state){
    sessionStorage.setItem("isAuthenticated", +state)
    // isAuthenticated=state;

}

export function getState(){
    return sessionStorage.getItem('isAuthenticated') ==='1';
}

