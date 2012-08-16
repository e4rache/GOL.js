// Game of life.

var GOL = GOL || {};

GOL.Engine = function (worldSize) {
	this.worldSize = worldSize || 50;
	this.currentStateMatrix=[];
	this.oldStateMatrix=[];
	this.__initMatrices();
}

GOL.Engine.prototype = {
	
	constructor: GOL.Engine,
	
	tick: function() {
		
		this.__shiftStates();
		
		for (var i = 0; i < this.worldSize; i++) {
			for (var j = 0; j < this.worldSize; j++) {
				var previousState = this.oldStateMatrix[i][j];
				var newState = this.computeNextState(i,j,previousState);
				this.currentStateMatrix[i][j]=newState;
			}
		}
	},

	computeNextState : function(i,j,previousState) {
		var adjacentLiveCellCount = this.getNumberOfAdjacentAtState(i,j,1);
		if ( previousState==1 ) {
			if ( adjacentLiveCellCount < 2) { nextState=0} 
			else if ( adjacentLiveCellCount <=3 ) { nextState=1}
		 	else if ( adjacentLiveCellCount >3 ) { nextState=0}
		} else if ( previousState==0) {
			if ( adjacentLiveCellCount==3) {nextState=1}
			else {nextState=0}
		}
		return nextState;
	},

	getNumberOfAdjacentAtState : function(i,j,stateToScan) {
		// use && max_val instead of boundary checks

		var counter = 0;
		var oldStates = this.oldStateMatrix;

		var leftI, leftJ;
		var rightI, rightJ;
		var upI, upJ;
		var downI, downJ;

		var upLeftI, upLeftJ;
		var downLeftI, downLeftJ;
		var upRightI, upRightJ;
		var downRightI, downRightJ;
		var upLeftI, upLeftJ;
		var downLeftI, downLeftJ;

		// not affected by boundaries
		upI = i;
		downI = i;

		leftJ = j;
		rightJ = j;


		// leftI and rightI
		if ( i == 0 ) {
			leftI = this.worldSize - 1;
			rightI = i+1;
		} else if ( i == this.worldSize -1 ) {
			leftI = i-1;
			rightI = 0;
		} else {
			leftI = i-1;
			rightI = i+1;	
		}

		// upJ and downJ
		if ( j == 0 ) {
			upJ = this.worldSize -1  ;
			downJ = j+1 ;
		} else if ( j == this.worldSize -1 ) {
			upJ =  j-1;
			downJ = 0 ;
		} else {
			upJ = j-1 ;
			downJ = j+1 ;
		}

		upRightI = rightI;
		upRightJ = upJ;
		downRightI = rightI;
		downRightJ = downJ;

		upLeftI = leftI;
		upLeftJ = upJ;
		downLeftI = leftI;
		downLeftJ = downJ;

		if ( oldStates      [leftI][leftJ]		==stateToScan) { counter++ };
		if ( oldStates     [rightI][rightJ]		==stateToScan) { counter++ };
		if ( oldStates        [upI][upJ]        ==stateToScan) { counter++ };
		if ( oldStates      [downI][downJ]      ==stateToScan) { counter++ };
		if ( oldStates   [upRightI][upRightJ]   ==stateToScan) { counter++ };
		if ( oldStates [downRightI][downRightJ] ==stateToScan) { counter++ };
		if ( oldStates    [upLeftI][upLeftJ]    ==stateToScan) { counter++ };
		if ( oldStates  [downLeftI][downLeftJ]  ==stateToScan) { counter++ };

		return counter;
	},

	getState : function(i,j) {
		return this.currentStateMatrix[i][j];
	},

	randomizeStates : function (probability) {
		var prob = probability || 0.5;
		for ( var i = 0 ; i < this.worldSize ; i++ ) {
			for ( var j = 0 ; j < this.worldSize ; j++ ) {	
				this.currentStateMatrix[i][j] = (Math.random() < prob ? 0 : 1)
			}
		}
	},

	//

	__shiftStates : function() {
		for (var i = 0 ; i <= this.worldSize; i++) {
			for (var j = 0; j <= this.worldSize; j++) {
				this.oldStateMatrix[i][j] = this.currentStateMatrix[i][j];
			}
		}
	},

	__initMatrices : function() {
		for (var i = 0 ; i <= this.worldSize; i++) {					
			this.currentStateMatrix[i]={};
			this.oldStateMatrix[i]={};
			for (var j = 0; j <= this.worldSize; j++ ) {
				var state = ( Math.random() >  0.5 )  ? 0 : 1
				this.currentStateMatrix[i][j]=state;				
				this.oldStateMatrix[i][j]=state;
			}
		}
	},
}

