import React, { useMemo, useState } from "react";
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";

import { useAppContext } from "./Context";
import { accessLevels, roles, editableRoles } from "./default";

function findPathToRoot(nodeId, data) {
  let path = [];
  for (let i = 0; i < data.length; i++) {
    let node = data[i];
    if (node.nodeId === nodeId) {
      return [node, ...path];
    } else if (node.children) {
      let subPath = findPathToRoot(nodeId, node.children);
      if (subPath) {
        path.unshift(node);
        return [...subPath, ...path];
      }
    }
  }
  return null;
}

function TabPanel(props) {
  const { children, value, item, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== item}
      id={`simple-tabpanel-${item}`}
      {...other}
    >
      {value === item && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Form() {
  const { setNodeId, nodeId, values, setValues } = useAppContext();

  const handleClose = () => {
    setNodeId(undefined);
  };

  const path = useMemo(
    () => (nodeId ? findPathToRoot(nodeId, values)?.reverse() : []),
    [nodeId, values]
  );

  const [loggedInUser, setLoggedInUser] = useState("ORG_ADMIN");
  const [viewedUser, setViewedUser] = useState("EMPLOYEE");

  const currentNode = useMemo(() => {
    return path.at(-1);
  }, [path]);

  console.log({ currentNode });

  const value = useMemo(() => {
    return currentNode?.permission?.[loggedInUser]?.[viewedUser] || "H";
  }, [currentNode, loggedInUser, viewedUser]);

  const handleChange = (e) => {
    const clone = _.cloneDeep(values);
    clone.forEach(function iter(i) {
      if (i.nodeId === currentNode.nodeId) {
        i.permission = {
          ...i.permission,
          [loggedInUser]: {
            ...i.permission?.[loggedInUser],
            [viewedUser]: e.target.value,
          },
        };
      }
      if (i.children && i.children.length > 0) {
        i.children.forEach(iter);
      }
    });
    setValues(clone);
  };

  return (
    <Dialog maxWidth="lg" fullWidth open={!!nodeId} onClose={handleClose}>
      <DialogTitle>
        <Breadcrumbs aria-label="breadcrumb">
          {path.map((i) => (
            <Typography key={i.nodeId} color="text.primary">
              {i.label}
            </Typography>
          ))}
        </Breadcrumbs>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs value={loggedInUser} onChange={(_, t) => setLoggedInUser(t)}>
            {roles.map((i) => (
              <Tab
                style={{ textTransform: "none" }}
                key={i.key}
                label={i.label}
                value={i.key}
              />
            ))}
          </Tabs>
        </Box>
        {roles.map((i) => (
          <TabPanel key={i.key} value={loggedInUser} item={i.key}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                height: "100%",
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={viewedUser}
                onChange={(_, t) => setViewedUser(t)}
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {editableRoles.map((i) => (
                  <Tab
                    style={{ textTransform: "none" }}
                    key={i.key}
                    label={i.label}
                    value={i.key}
                  />
                ))}
              </Tabs>
              {editableRoles.map((i) => (
                <TabPanel key={i.key} value={viewedUser} item={i.key}>
                  <Box sx={{ minWidth: 360 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Access Level
                      </InputLabel>
                      <Select
                        value={value}
                        onChange={handleChange}
                        label="Access Level"
                      >
                        {accessLevels.map((i) => (
                          <MenuItem key={i.key} value={i.key}>
                            {i.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </TabPanel>
              ))}
            </Box>
          </TabPanel>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
