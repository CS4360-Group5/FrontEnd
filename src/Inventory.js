import React, { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [checkedIndices, setCheckedIndices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/inventory")
      .then((response) => {
        setInventory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleToggle = (index) => {
    if (checkedIndices.includes(index)) {
      setCheckedIndices(checkedIndices.filter((i) => i !== index));
    } else {
      setCheckedIndices([...checkedIndices, index]);
    }
  };

  const isItemChecked = (index) => {
    return checkedIndices.includes(index);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          m: 1,
          height: "100%",
        }}
      >
        <List style={{ maxHeight: "300px", overflowY: "auto" }}>
          {inventory.map((item, index) => (
            <React.Fragment key={item.inventoryId}>
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    isItemChecked(index)
                      ? `${item.name} (Equipped)`
                      : item.name
                  }
                  primaryTypographyProps={{
                    style: {
                      fontSize: "18px",
                      fontWeight: isItemChecked(index) ? "bold" : "normal",
                      color: "white",
                    },
                  }}
                />
                <Checkbox
                  checked={isItemChecked(index)}
                  onChange={() => handleToggle(index)}
                />
              </ListItem>
              {index < inventory.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default InventoryList;