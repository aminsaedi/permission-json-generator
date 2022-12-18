import * as React from "react";

import {
  ExpandMoreOutlined,
  ChevronRight,
  DownloadOutlined,
  UploadFileOutlined,
  RestartAltOutlined,
  ModeEditOutline,
} from "@mui/icons-material";

import { TreeItem, TreeView } from "@mui/lab";
import { Button, Grid } from "@mui/material";
import Editor from "@monaco-editor/react";

import { useAppContext } from "./Context";
import { Box, Container } from "@mui/system";

export default function Tree() {
  const {
    setNodeId,
    values,
    handleUpload,
    handleDownload,
    handleReset,
    handleEditorChange,
  } = useAppContext();

  const render = React.useCallback(
    (arr) =>
      arr.map((i) => {
        const label = (
          <span>
            {i.label || i.nodeId}{" "}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setNodeId(i.nodeId);
              }}
              size="small"
            >
              <ModeEditOutline />
            </Button>
          </span>
        );

        if (i.children && i.children.length > 0) {
          return (
            <TreeItem label={label} nodeId={i.nodeId} key={i.nodeId}>
              {render(i.children)}
            </TreeItem>
          );
        }
        return <TreeItem label={label} key={i.nodeId} nodeId={i.nodeId} />;
      }),
    [setNodeId]
  );

  return (
    <Container maxWidth="xl">
      <Grid spacing={4} container>
        <Grid item xs={6}>
          <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreOutlined />}
            defaultExpandIcon={<ChevronRight />}
            // style={{ width: "100%" }}
          >
            {render(values)}
          </TreeView>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
            <Box sx={{ m: 1 }}>
              <Button onClick={handleDownload} variant="contained">
                Download
                <DownloadOutlined />
              </Button>
            </Box>
            <Box sx={{ m: 1 }}>
              <Button variant="contained" component="label">
                Upload
                <UploadFileOutlined />
                <input
                  hidden
                  accept=".json"
                  multiple
                  type="file"
                  onChange={handleUpload}
                />
              </Button>
            </Box>
            <Box sx={{ m: 1 }}>
              <Button
                onClick={handleReset}
                variant="contained"
                component="label"
              >
                Reset to default
                <RestartAltOutlined />
              </Button>
            </Box>
          </Box>
          <Editor
            height="90vh"
            defaultLanguage="json"
            value={JSON.stringify(values, null, 2)}
            theme="vs-dark"
            onChange={handleEditorChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
