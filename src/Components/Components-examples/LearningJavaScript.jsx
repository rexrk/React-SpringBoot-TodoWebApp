const person = {
    name : "Raman",
    address : {
        line1 : 'Kali Kundu Lane',
        city : "Howrah",
        pin : 711101,
    },

    banks : ['sbi', 'kotak', 'paytm'],
    printBanks: () => {
        person.banks.map(
            bank => console.log(bank)
        )
    }
}


function LearningJavaScript() {
    return (
        <>
            <div>Name : {person.name} </div>
            <div>Address : {person.address.line1}</div>
            <div>Address : {person.address.city}</div>
            <div>Address : {person.address.pin}</div>

            <div>Banks : {person.printBanks()}</div>
        </>
    )
}

export default LearningJavaScript;