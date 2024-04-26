import { useEffect } from "react";
import { useCurrentUser } from "../../../context/CurrentUser";

export default function WorkDefend() {
  const { currentUser } = useCurrentUser();
  //   setTimeout(() => {
  //     console.log(currentUser);
  //     if (!currentUser?.activated) {
  //       window.location.href = "/";
  //     }
  //   }, 3000);
  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return <>{}</>;
}
