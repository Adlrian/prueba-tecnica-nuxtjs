
const URL = 'https://postman-echo.com'

async function sendData(formObj) {
    const info = {
      name: 'Adrian',
      address: 'test',
      gender: 1
    }

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    }

    try {
      const result = await this.$axios.get(`${URL}/put`, requestOptions);
    } catch(e) {
      console.log(e);
    }
}

async function getInfo2(formObj) {
  const post = {
    title: formObj.serialNumber,
    body: formObj.condition,
    userId: 1
  }

  try {
    const result = await   this.$axios.$post('https://jsonplaceholder.typicode.com/posts', post);
    console.log(result);
  } catch(e) {
    console.log(e);
  }
}

export default {
  sendData,
}