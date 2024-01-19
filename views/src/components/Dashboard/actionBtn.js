// import readSecret from "./createSecret.js";
import UpdateSecret from "./updateSecret.js";
import DeleteSecret from "./deleteSecret.js";

const ActionBtn = () => {
  return (
    <div className="flex">
      <UpdateSecret />
      <DeleteSecret />
    </div>
  );
};

export default ActionBtn;
