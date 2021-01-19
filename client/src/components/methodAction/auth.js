
export const GetUser = async (token) => {
    try {
        const MyHeaders = new Headers();
        MyHeaders.append("x-auth-token" , token);

        const MyRequest = new Request("/auth" , {
            method : "GET",
            headers : MyHeaders
        });

        const data = await fetch(MyRequest);
        return data.json()

    } catch (error) {
        console.log(`this is error me : ${error}`);
    }
}