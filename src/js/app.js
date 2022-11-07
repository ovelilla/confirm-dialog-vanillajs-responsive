import Confirm from "./components/confirm";

const confirmBtn = document.querySelector("#confirm-btn");

confirmBtn.addEventListener("click", async () => {
    const confirm = new Confirm({
        title: "¿Eliminar usuario?",
        description: "¿Estás seguro de eliminar este usuario? Los datos no podrán ser recuperados.",
        accept: "Eliminar",
        cancel: "Cancelar",
    });

    const response = await confirm.question();

    if (!response) {
        console.log("El usuario no fue eliminado");
        return;
    }

    console.log("El usuario fue eliminado");
});
