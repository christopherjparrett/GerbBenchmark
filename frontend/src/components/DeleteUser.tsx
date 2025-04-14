function DeleteUser() {
    const [message, setMessage] = React.useState('');
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = "";
    var ud = JSON.parse(_ud);

    async function doDeleteUser(event: any): Promise<void> {
        event.preventDefault();

        var obj = { _id: ud.id };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch('https://card.christopherjparrett.xyz/api/deleteUser',
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.boolStatus) {//If the user is deleted, simply remove the user data and send them out to the home page
                localStorage.removeItem("user_data")
                window.location.href = '/';
            }
            else {//if the user is not deleted, set the error message to display
                setMessage(res.error);
            }

        }
        catch (error: any) {
            alert(error.toString());
            return;
        }
    };

    //TO DO ==========
    //Add a return div like in the other .tsx components to act as the button to call this API function when pressed
    return (
        <a onClick={doDeleteUser} className="sub-menu-link">
            <img src={require('../assets/remove-user.png')} alt="Delete User" />
            <p>Delete User</p>
            <span>  </span>
        </a>
    );
}
export default DeleteUser;