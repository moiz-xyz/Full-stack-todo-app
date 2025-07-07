import bcrypt, { hash } from "bcrypt"

// gemerate opt
export const otpGenerate = ()=>{
Math.floor(100000 + Math.random() * 900000).toString();
}

export const hashValue = async (value) => {
  if (!value) throw new Error("hashValue: value is empty");
  const saltRounds = 10;            
  return await bcrypt.hash(value, saltRounds);
}

export const compareHash = async(val , hash)=>{
await bcrypt.compare(val,hash)
}