import MyAddressesPage from "./my-addresses/page";
import SettingsPage from "./settings/page";

export default function layout() {
  return (
    <div>
      <MyAddressesPage />
      <SettingsPage />
    </div>
  );
}
