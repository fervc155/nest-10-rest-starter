import * as jsonwebtoken from "jsonwebtoken";

class Jwt {
 
 
  
	decode(token:any){

		try{
		   return (jsonwebtoken.verify(token, process.env.JWT_SECRET ) as any) || false;
		}
		catch(e){
			return false;
		}
	}
	  sign(payload: any, expiresIn: string = '24h'): string {
	    return jsonwebtoken.sign(payload,  process.env.JWT_SECRET, { expiresIn });
	  }


	check(token){

		if(!token)
			return false;

		let response = this.decode(token);
		console.log('decode',response);

		if(!response){
			return false;
		}

	    if (response.exp <= (new Date().getTime() ) / 1000) 
	    {
	    	return false;
	    }	

	    return response;

	}


}

export default Jwt ;