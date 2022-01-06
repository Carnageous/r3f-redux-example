import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function Dashboard(): JSX.Element {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "dive-test.eu.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://public.dive`,
          scope: "read:current_user",
        });

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const { user_metadata } = await metadataResponse.json();

        setUserMetadata(user_metadata);
      } catch (e) {
        console.log((e as any).message);
      }
    };

    const getOrganizations = async () => {
      const domain = "dive-test.eu.auth0.com";

      try {
        const accessToken = await getAccessTokenSilently();

        console.log(accessToken);

        const organizationsUrl = `https://${domain}/api/v2/organizations`;

        const organizationsResponse = await fetch(organizationsUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const json = await organizationsResponse.json();
        console.log(json);
      } catch (e) {
        console.log((e as any).message);
      }
    };

    const getMessage = async () => {
      const token = await getAccessTokenSilently();

      const response = await fetch(`http://localhost:6060/api/messages/protected-message`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1iQTNzZ1YycXZ2SWN2QlQtNkF4dSJ9.eyJpc3MiOiJodHRwczovL2RpdmUtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjFkMzBhMGE5MTQ4OGIwMDY5ZjJlMjEzIiwiYXVkIjpbImh0dHBzOi8vcHVibGljLmRpdmUiLCJodHRwczovL2RpdmUtdGVzdC5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjQxMzkwMDk4LCJleHAiOjE2NDE0NzY0OTgsImF6cCI6InNQa0NkU2lYc0w0SGVnVzRyWnlTQ251MWlndzV4RjVNIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCByZWFkOm9yZ2FuaXphdGlvbnMiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOmNsaWVudF9ncmFudHMiLCJyZWFkOmNsaWVudHMiLCJyZWFkOm9yZ2FuaXphdGlvbnMiLCJyZWFkOnVzZXJzIiwicmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEiXX0.KqrZKUrUbxEEDbrGIbB7ECsivZdsQdbVAqQyZ7iLsN-T_qq2pd_rXhhCiHxxoux7bf9ciBt-SoksN21zde9f8-GaDD8kSXsHRCTHYJyMlzcpewFbgm6GML05qMkh-UGi8qB37LRMyT9LjwVR6VYTQkUCbGj48ao1XwD7NWWipqbPtJ8gqPVtMe7oq-Da3YtUGhc8RgdgHIXFsGHc47yV8D3KPQncBB9E3heUbkLuQY15pcdo09-4pNFJd82uGaYzO_1Z045M26VXIm3oKil2qbbl_QbzXBkPUKBX0UzNJHI9-dno6tnUwalBGzFdzrMC7LqxfD1o4YY2CZA4eMLbvA`,
        },
      });
      const responseData = await response.json();

      console.log(responseData);
    };

    // getUserMetadata();
    // getOrganizations();
    getMessage();
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <div className="p-32">
      <h1>User Info:</h1>
      {isAuthenticated && (
        <div>
          <img src={user?.picture} alt={user?.name} />
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <h3>User Metadata</h3>
          {userMetadata ? <pre>{JSON.stringify(userMetadata, null, 2)}</pre> : "No user metadata defined"}
        </div>
      )}
    </div>
  );
}
