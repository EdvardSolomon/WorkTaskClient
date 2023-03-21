import { faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useUserStore } from "../../../data/stores/useUserStore";

const PermissionRoute = () => {
    const { folderId } = useParams();
    const [boolean, setBoolean] = useState();

    const [userData, currentFolder, permissions, fetchFolder]: any = useUserStore((state) => [
        state.userData,
        state.currentFolder,
        state.permissions,
        state.fetchFolder,
      ]);

      useEffect(() => {
        fetchFolder(folderId)
      }, [folderId])

      useEffect(() => {
        if(currentFolder && userData){
            const perm = permissions.find((permission) => permission.userId == userData.id);
            const bool =  currentFolder.userId == userData.id || perm ? true : false;
            setBoolean(bool);
        }
        }, [currentFolder, userData])

    if(boolean === undefined) return (
        <>
          <Row>
            <Col md="12">
              <p className="text-center small text-center my-5">LOADING...</p>
            </Col>
          </Row>
        </>
      );

    return (
        boolean 
        ? <Outlet />
        : <Navigate to="/403" replace/>
    );
}

export default PermissionRoute;