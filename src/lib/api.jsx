const FIREBASE_DOMAIN = import.meta.env.VITE_FIREBASE_DOMAIN;
const APIKEY=import.meta.env.VITE_APIKEY

export async function addQuote(quoteData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: "POST",
    body: JSON.stringify(quoteData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not create quote");
  }
  return null;
}

export async function allQuotes() {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not create quote");
  }
  const transformedQuotes = [];

  for (const key in data) {
    const quoteObj = {
      id: key,
      ...data[key],
    };
    transformedQuotes.push(quoteObj);
  }
  return transformedQuotes;
}
export async function singleQuotes(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not create quote");
  }

  const quote = {
    id: quoteId,
    ...data,
  };
  return quote;
}

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.qid}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData.comment),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not create quote");
  }
  return null;
}

export async function allComments(qid) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${qid}.json`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not load comment");
  }
  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };
    transformedComments.push(commentObj);
  }
  return transformedComments;
}

export async function signUp(auth) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: auth.email,
        password: auth.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    let errorMessage = "Authentication failed";
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    alert(errorMessage);
    throw new Error(data.message || "Could not sign up");
  }
  return data;
}
export async function signIn(auth) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: auth.email,
        password: auth.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    let errorMessage = "Authentication failed";
    if (data && data.error && data.error.message) {
      errorMessage = data.error.message;
    }
    alert(errorMessage);
    throw new Error(data.message || "Could not sign up");
  }
  return data;
}
