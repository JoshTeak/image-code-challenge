import React from 'react';

class DashboardPage extends React.Component {
	constructor(props) {
		super(props)
		
		this.width = 256;
	    this.height = 128;

	    this.pixelCount = 0;
	    this.colorCombo = 1;

	    this.buffer = new Uint8ClampedArray(this.width * this.height * 4); // have enough bytes
		this.image = new Image();

    	this.CreateImage();	
	}

	CreateImage = () => {
    	let verticalPixelOffSet;
    	let horizontalPixelOffSet;
    	let rowNumber;
		for(let i = 0; i < 32; i ++)
    	{
	    	this.pixelCount = 0;
	    	rowNumber = Math.floor(i / 8);
	    	verticalPixelOffSet = rowNumber * 32;
			horizontalPixelOffSet = (i % 8) * 32;

	    	if(rowNumber % 2 == 0)
	    	{
	    		for(let y = verticalPixelOffSet; y < verticalPixelOffSet + 32; y++) {
		    		if(i % 2 == 0)
					{	    		
						for(let x = horizontalPixelOffSet; x < horizontalPixelOffSet + 32; x++) {
					        this.AssignPixel(x, y, i);
					    }
					} else {
						for(let x = horizontalPixelOffSet + 31; x >= horizontalPixelOffSet; x--) {
					        this.AssignPixel(x, y, i);
					    }
					}
				}
	    	} else {
	    		for(let y = verticalPixelOffSet + 31; y >= verticalPixelOffSet; y--) {
		    		if(i % 2 == 0)
					{	    		
						for(let x = horizontalPixelOffSet; x < horizontalPixelOffSet + 32; x++) {
					        this.AssignPixel(x, y, i);
					    }
					} else {
						for(let x = horizontalPixelOffSet + 31; x >= horizontalPixelOffSet; x--) {
					        this.AssignPixel(x, y, i);
					    }
					}
				}
	    	}
    	}


		// create off-screen canvas element
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.width;
		canvas.height = this.height;

		// create imageData object
		let idata = ctx.createImageData(this.width, this.height);

		// set our buffer as source
		idata.data.set(this.buffer);

		// update canvas with new data
		ctx.putImageData(idata, 0, 0);


		let dataUri = canvas.toDataURL(); // produces a PNG file

		this.image.src = dataUri;
		document.body.appendChild(this.image);
	}

	AssignPixel = (x, y, i) => {
		const pos = (y * this.width + x) * 4; // position in buffer based on x and y

		//first color component
        let fC = ((this.pixelCount % 32) + 1) * 8;
        //second color component
    	let sC = (Math.floor((this.pixelCount / 32)) + 1) * 8;
    	//third color component
    	let tC = 255 - i * 8;

    	//selecting color combo
    	switch(this.colorCombo) {
    		case 1:
    			this.Buffering(pos, fC, sC, tC);
    			break;
    		case 2:
    			this.Buffering(pos, fC, tC, sC);
    			break;
    		case 3:
    			this.Buffering(pos, sC, fC, tC);
    			break;
    		case 4:
    			this.Buffering(pos, sC, tC, fC);
    			break;
    		case 5:
    			this.Buffering(pos, tC, fC, sC);
    			break;
    		case 6:
    			this.Buffering(pos, tC, sC, fC);
    			break;
    	}
        this.pixelCount++;
	}

	Buffering = (position, fC, sC, tC) => {
		this.buffer[position  ] = fC;           	// some R value [0, 255]
        this.buffer[position+1] = sC;           	// some G value
        this.buffer[position+2] = tC;           	// some B value
    	this.buffer[position+3] = 255;           		// set alpha channel
	}

	ChangeColoring = (e) => {
		e.preventDefault();
		if(this.colorCombo != 6)
		{
			this.colorCombo++;
		} else {
			this.colorCombo = 1;
		}
		this.CreateImage();
		this.forceUpdate();
	}

	render() {
		return (
			<div className="button-container">
				<h3 className="heading">Image Coding Challenge</h3>
			    <button className="button" onClick={this.ChangeColoring}>Change Colouring</button>
			</div>
		)
	}
}

export default DashboardPage;
