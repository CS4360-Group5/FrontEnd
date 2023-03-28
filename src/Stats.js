import React from "react";
import styles from "./Stats.module.css";

function Stats() {
    return (
      <div>
        <h1 className={styles["stats-header"]}>Character name:</h1>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>Stats:</h2>
            <table className={styles["stats-table"]}>
              <tbody>
                <tr>
                  <td>hp:</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>attack:</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>defense:</td>
                  <td>3</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Current Level:</h2>
            <table className={styles["stats-table"]}>
              <tbody>
                <tr>
                  <td>Level:</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>XP:</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default Stats;