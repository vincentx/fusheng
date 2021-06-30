export const addStyle = ($) => {
  $.root().append(`
    <style>
      .success {
          background-color: #afa;
      }
      .success .assert-actual {
          display: none;
      }
      .error {
          background-color: #ffb0b0;
          padding: 1px;
      }
      .error .assert-expect {
          text-decoration: line-through;
          color: #bb5050;
          margin-right: 5px;
      }
    </style>
  `)
}