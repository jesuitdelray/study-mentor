import { Alert } from "./Snackbar";

export default {
  title: "Components/UI/Snackbar",
  component: () => {
    return (
      <div style={{ height: "200px", width: "300px", display: "flex", flexDirection: "column" }}>
        <button
          onClick={() => Alert.normal("Something")}
          style={{
            marginBottom: "10px",
            padding: "5px",
            cursor: "pointer"
          }}
        >
          Trigger Snackbar Normal
        </button>
        <button
          onClick={() => Alert.error("Incorrect email or password, please try again")}
          style={{
            marginBottom: "10px",
            padding: "5px",
            cursor: "pointer"
          }}
        >
          Trigger Snackbar Error
        </button>
      </div>
    );
  }
};

export const Template: any = {};
