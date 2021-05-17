import React from 'react';

class DashboardPage extends React.Component {
	constructor(props) {
		super(props)


		this.width = 256;
	    this.height = 128;
	    this.buffer = new Uint8ClampedArray(this.width * this.height * 4); // have enough bytes
	    this.pixelCount = 0;

	    this.colorCombo = 1;
		this.firstComponent;
    	this.secondComponent;
    	this.thirdComponent;



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
					        this.Buffering(x, y, i);
					    }
					} else {
						for(let x = horizontalPixelOffSet + 31; x >= horizontalPixelOffSet; x--) {
					        this.Buffering(x, y, i);
					    }
					}
				}
	    	} else {
	    		for(let y = verticalPixelOffSet + 31; y >= verticalPixelOffSet; y--) {
		    		if(i % 2 == 0)
					{	    		
						for(let x = horizontalPixelOffSet; x < horizontalPixelOffSet + 32; x++) {
					        this.Buffering(x, y, i);
					    }
					} else {
						for(let x = horizontalPixelOffSet + 31; x >= horizontalPixelOffSet; x--) {
					        this.Buffering(x, y, i);
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

	Buffering = (x, y, i) => {
		const pos = (y * this.width + x) * 4; // position in buffer based on x and y

        this.firstComponent = ((this.pixelCount % 32) + 1) * 8;
    	this.secondComponent = (Math.floor((this.pixelCount / 32)) + 1) * 8;
    	this.thirdComponent = 255 - i * 8;

    	switch(this.colorCombo) {
    		case 1:
    			this.ColorComboOne(pos);
    			break;
    		case 2:
    			this.ColorComboTwo(pos);
    			break;
    		case 3:
    			this.ColorComboThree(pos);
    			break;
    		case 4:
    			this.ColorComboFour(pos);
    			break;
    		case 5:
    			this.ColorComboFive(pos);
    			break;
    		case 6:
    			this.ColorComboSix(pos);
    			break;
    	}

        this.pixelCount++;
	}

	ColorComboOne = (position) => {
		this.buffer[position  ] = this.firstComponent;           	// some R value [0, 255]
        this.buffer[position+1] = this.secondComponent;           	// some G value
        this.buffer[position+2] = this.thirdComponent;           	// some B value
        this.buffer[position+3] = 255;           					// set alpha channel
	}

	ColorComboTwo = (position) => {
		this.buffer[position  ] = this.firstComponent;           	// some R value [0, 255]
        this.buffer[position+1] = this.thirdComponent;           	// some G value
        this.buffer[position+2] = this.secondComponent;           	// some B value
        this.buffer[position+3] = 255;           					// set alpha channel
	}

	ColorComboThree = (position) => {
		this.buffer[position  ] = this.secondComponent;           	// some R value [0, 255]
        this.buffer[position+1] = this.firstComponent;           	// some G value
        this.buffer[position+2] = this.thirdComponent;           	// some B value
        this.buffer[position+3] = 255;           					// set alpha channel
	}

	ColorComboFour = (position) => {
		this.buffer[position  ] = this.secondComponent;           	// some R value [0, 255]
        this.buffer[position+1] = this.thirdComponent;           	// some G value
        this.buffer[position+2] = this.firstComponent;           	// some B value
        this.buffer[position+3] = 255;           					// set alpha channel
	}

	ColorComboFive = (position) => {
		this.buffer[position  ] = this.thirdComponent;           	// some R value [0, 255]
        this.buffer[position+1] = this.firstComponent;           	// some G value
        this.buffer[position+2] = this.secondComponent;           	// some B value
        this.buffer[position+3] = 255;           					// set alpha channel
	}

	ColorComboSix = (position) => {
		this.buffer[position  ] = this.thirdComponent;           	// some R value [0, 255]
        this.buffer[position+1] = this.secondComponent;           	// some G value
        this.buffer[position+2] = this.firstComponent;           	// some B value
        this.buffer[position+3] = 255;           					// set alpha channel
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
			<div>
			    <button className="button" onClick={this.ChangeColoring}>Change colouring</button>
			</div>
		)
	}
}

export default DashboardPage;
