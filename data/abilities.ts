/*

Ratings and how they work:

-1: Detrimental
	  An ability that severely harms the user.
	ex. Defeatist, Slow Start

 0: Useless
	  An ability with no overall benefit in a singles battle.
	ex. Color Change, Plus

 1: Ineffective
	  An ability that has minimal effect or is only useful in niche situations.
	ex. Light Metal, Suction Cups

 2: Useful
	  An ability that can be generally useful.
	ex. Flame Body, Overcoat

 3: Effective
	  An ability with a strong effect on the user or foe.
	ex. Chlorophyll, Sturdy

 4: Very useful
	  One of the more popular abilities. It requires minimal support to be effective.
	ex. Adaptability, Magic Bounce

 5: Essential
	  The sort of ability that defines metagames.
	ex. Imposter, Shadow Tag

*/

export const Abilities: import('../sim/dex-abilities').AbilityDataTable = {
	// Custom Abilities
	monsoonsurge: {
		name: "Monsoon Surge",
		onStart(_) {
			if (this.field.isWeather('raindance')) return;
			this.field.setWeather('raindance');
		},
		num: -1001,
		rating: 4,
	},
	blizzardveil: {
		name: 'Blizzard Veil',
		onStart(_) {
			if (this.field.isWeather('snowscape')) return;
			this.field.setWeather('snowscape');
		},
		num: -1002,
		rating: 4,
	},
	sandstormrage: {
		name: "Sandstorm Rage",
		onStart(_) {
			if (this.field.isWeather('sandstorm')) return;
			this.field.setWeather('sandstorm');
		},
		num: -1003,
		rating: 4,
	},
	solarflare: {
		name: 'Solar Flare',
		onStart(pokemon) {
			if (this.field.isWeather('sunnyday')) return;
			this.field.setWeather('sunnyday');
		},
		num: -1004,
		rating: 4,
	},
	eerieresonance: {
		name: 'Eerie Resonance',
		onStart(_) {
			if (this.field.isTerrain('electricterrain')) return;
			this.field.setTerrain('electricterrain');
		},
		num: -1005,
		rating: 4,
	},
	mindscapedomain: {
		name: 'Mindscape Domain',
		onStart(_) {
			if (this.field.isTerrain('psychicterrain')) return;
			this.field.setTerrain('psychicterrain');
		},
		num: -1006,
		rating: 4,
	},
	verdantbloom: {
		name: 'Verdant Bloom',
		onStart(_) {
			if (this.field.isTerrain('grassyterrain')) return;
			this.field.setTerrain('grassyterrain');
		},
		num: -1007,
		rating: 4,
	},
	mystichaze: {
		name: 'Mystic Haze',
		onStart(_) {
			if (this.field.isTerrain('mistyterrain')) return;
			this.field.setTerrain('mistyterrain');
		},
		num: -1008,
		rating: 4,
	},
	tundracore: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Tundra Core is not affected by Utility Umbrella
			if (this.field.isWeather('snowscape') || this.field.isWeather('hail')) {
				pokemon.addVolatile('tundracore');
			} else if (!pokemon.volatiles['tundracore']?.fromBooster && !this.field.isWeather('snowscape')&& !this.field.isWeather('hail')) {
				pokemon.removeVolatile('tundracore');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['tundracore'];
			this.add('-end', pokemon, 'tundracore', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Tundra Core', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Tundra Core');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'Tundra Core' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Tundra Core atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Tundra Core def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Tundra Core spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Tundra Core spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Tundra Core spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Tundra Core');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Tundra Core",
		num: -1009,
		rating: 4,
	},
	lithogrit: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Lithogrit is not affected by Utility Umbrella
			if (this.field.isWeather('sandstorm')) {
				pokemon.addVolatile('lithogrit');
			} else if (!pokemon.volatiles['lithogrit']?.fromBooster && !this.field.isWeather('sandstorm')) {
				pokemon.removeVolatile('lithogrit');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['lithogrit'];
			this.add('-end', pokemon, 'lithogrit', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Lithogrit', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Lithogrit');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'Lithogrit' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Lithogrit atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Lithogrit def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Lithogrit spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Lithogrit spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Lithogrit spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Lithogrit');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Lithogrit",
		num: -1010,
		rating: 4,
	},
	atlantisblessing: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Atlantis Blessing is not affected by Utility Umbrella
			if (this.field.isWeather('raindance')) {
				pokemon.addVolatile('atlantisblessing');
			} else if (!pokemon.volatiles['atlantisblessing']?.fromBooster && !this.field.isWeather('raindance')) {
				pokemon.removeVolatile('atlantisblessing');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['atlantisblessing'];
			this.add('-end', pokemon, 'atlantisblessing', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Atlantis Blessing', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Atlantis Blessing');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'Atlantis Blessing' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Atlantis Blessing atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Atlantis Blessing def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Atlantis Blessing spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Atlantis Blessing spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Atlantis Blessing spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Atlantis Blessing');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Atlantis Blessing",
		num: -1011,
		rating: 4,
	},
	psychoritual: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('psychicterrain')) {
				pokemon.addVolatile('psychoritual');
			} else if (!pokemon.volatiles['psychoritual']?.fromBooster) {
				pokemon.removeVolatile('psychoritual');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['psychoritual'];
			this.add('-end', pokemon, 'Psycho Ritual', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Psycho Ritual', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Psycho Ritual');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'psychoritual' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Psycho Ritual atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Psycho Ritual def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Psycho Ritual spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Psycho Ritual spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Psycho Ritual spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Psycho Ritual');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Psycho Ritual",
		num: -1012,
		rating: 4,
	},
	mysticzone: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('mistyterrain')) {
				pokemon.addVolatile('mysticzone');
			} else if (!pokemon.volatiles['mysticzone']?.fromBooster) {
				pokemon.removeVolatile('mysticzone');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['mysticzone'];
			this.add('-end', pokemon, 'Mystic Zone', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Mystic Zone', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Mystic Zone');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'mysticzone' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Mystic Zone atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Mystic Zone def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Mystic Zone spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Mystic Zone spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Mystic Zone spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Mystic Zone');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Mystic Zone",
		num: -1013,
		rating: 4,
	},
	pureharvest: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('grassyterrain')) {
				pokemon.addVolatile('pureharvest');
			} else if (!pokemon.volatiles['pureharvest']?.fromBooster) {
				pokemon.removeVolatile('pureharvest');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['pureharvest'];
			this.add('-end', pokemon, 'Pure Harvest', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Pure Harvest', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Pure Harvest');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'pureharvest' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Pure Harvest atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Pure Harvest def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Pure Harvest spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Pure Harvest spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Pure Harvest spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Pure Harvest');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Pure Harvest",
		num: -1014,
		rating: 4,
	},
	arcanemight: {
		name: 'Arcane Might',
		onModifySpA() {
			return this.chainModify(2);
		},
		num: -1015,
		rating: 4,
	},
	terrify: {
		name: 'Terrify',
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Terrify', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target, 'substitute');
				} else {
					this.boost({ spa: -1 }, target, pokemon, null, true);
				}
			}
		},
		num: -1016,
		rating: 4,
	},
	charisma: {
		name: 'Charisma',
		onSourceAfterFaint(length, _, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ spa: length }, source);
			}
		},
		num: -1017,
		rating: 3.5,
	},
	bootsofruin: {
		name: 'Boots of Ruin',
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Boots of Ruin');
		},
		onAnyModifySpe(spe, target) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Boots of Ruin')) return;
			this.debug('Boots of Ruin spe drop');
			return this.chainModify(0.75);
		},
		num: -1018,
		rating: 4,
	},
	prismaticaura: {
		name: 'Prismatic Aura',
		onDamagingHit(_, target, source, move) {
			if (move.category === "Status") return;
			if (this.checkMoveMakesContact(move, source, target, true)) return;
			this.damage(source.baseMaxhp / 8, source, target);
		},
		num: -1019,
		rating: 4,
	},
	adaptivemastery: {
		name: 'Adaptive Mastery',
		onModifyAtk(_, attacker, _defender, move) {
			// Has stab already.
			if (attacker.hasType(move.type)) return;
			this.debug(('Adaptive Mastery boost'));
			return this.chainModify(1.5);
		},
		onModifySpA(_, attacker, _defender, move) {
			// Has stab already.
			if (attacker.hasType(move.type)) return;
			this.debug(('Adaptive Mastery boost'));
			return this.chainModify(1.5);
		},
		num: -1020,
		rating: 4,
	},
	stormbloom: {
		name: 'Storm Bloom',
		onStart() {
			if (!this.field.isWeather('raindance')) {
				this.field.setWeather('raindance');
			}

			if (!this.field.isTerrain('grassyterrain')) {
				this.field.setTerrain('grassyterrain');
			}
		},
		num: -1021,
		rating: 3.5,
	},
	solarmist: {
		name: 'Solar Mist',
		onStart() {
			if (!this.field.isWeather('sunnyday')) {
				this.field.setWeather('sunnyday');
			}

			if (!this.field.isTerrain('mistyterrain')) {
				this.field.setTerrain('mistyterrain');
			}
		},
		num: -1022,
		rating: 3.5,
	},
	desertmind: {
		name: 'Desert Mind',
		onStart() {
			if (!this.field.isWeather('sandstorm')) {
				this.field.setWeather('sandstorm');
			}

			if (!this.field.isTerrain('psychicterrain')) {
				this.field.setTerrain('psychicterrain');
			}
		},
		num: -1023,
		rating: 3.5,
	},
	frostvolt: {
		name: 'Frost Volt',
		onStart() {
			if (!this.field.isWeather('snow')) {
				this.field.setWeather('snow');
			}

			if (!this.field.isTerrain('electricterrain')) {
				this.field.setTerrain('electricterrain');
			}
		},
		num: -1024,
		rating: 4,
	},
	soulharvest: {
		name: 'Soul Harvest',
		onSourceAfterFaint(_, _target, source, effect) {
			if (!effect || effect.effectType !== 'Move') return;
			source.heal(source.baseMaxhp / 4);
			this.add('-ability', source, 'Soul Harvest');
			this.add('-heal', source, source.getHealth, 'ability: Soul Harvest');
		},
		num: -1025,
		rating: 3.5,
	},
	entomize: {
		name: 'Entomize',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				"judgment", "multiattack", "naturalgift", "revelationdance",
				"technoblast", "terrainpulse", "weatherball",
			];
			if (move.type !== "Normal") return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Bug";
			move.typeChangerBoosted = this.effect;
		},
		num: -1026,
		rating: 3,
	},
	umbralforce: {
		name: 'Umbral Force',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				"judgment", "multiattack", "naturalgift", "revelationdance",
				"technoblast", "terrainpulse", "weatherball",
			];
			if (move.type !== "Normal") return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Dark";
			move.typeChangerBoosted = this.effect;
		},
		num: -1027,
		rating: 3,
	},
	dragonize: {
		name: 'Dragonize',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				"judgment", "multiattack", "naturalgift", "revelationdance",
				"technoblast", "terrainpulse", "weatherball",
			];
			if (move.type !== "Normal") return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Dragon";
			move.typeChangerBoosted = this.effect;
		},
		num: -1028,
		rating: 3,
	},
	combatboost: {
		name: 'Combat Boost',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				"judgment", "multiattack", "naturalgift", "revelationdance",
				"technoblast", "terrainpulse", "weatherball",
			];
			if (move.type !== "Normal") return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Fighting";
			move.typeChangerBoosted = this.effect;
		},
		num: -1029,
		rating: 3,
	},
	infernalize: {
		name: 'Infernalize',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				"judgment", "multiattack", "naturalgift", "revelationdance",
				"technoblast", "terrainpulse", "weatherball",
			];
			if (move.type !== "Normal") return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Fire";
			move.typeChangerBoosted = this.effect;
		},
		num: -1030,
		rating: 3,
	},
	antennaboost: {
		name: 'Antenna Boost',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Bug") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1031,
		rating: 3,
	},
	shadowsprint: {
		name: 'Shadows Print',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Dark") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1032,
		rating: 3,
	},
	wyvernwings: {
		name: 'Wyvern Wings',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Dragon") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1033,
		rating: 3,
	},
	pixiedash: {
		name: 'Pixie Dash',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Fairy") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1034,
		rating: 3,
	},
	voltdash: {
		name: 'Volt Dash',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Electric") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1035,
		rating: 3,
	},
	brawlersinstinct: {
		name: 'Brawler\'s Instinct',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Fighting") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1036,
		rating: 3,
	},
	blazerush: {
		name: 'Blaze Rush',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Fire") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1037,
		rating: 3,
	},
	verdantsurge: {
		name: 'Verdant Surge',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Grass") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1038,
		rating: 3,
	},
	earthgrace: {
		name: 'Earth Grace',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Ground") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1039,
		rating: 3,
	},
	frostdash: {
		name: 'Frost Dash',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Ice") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1040,
		rating: 3,
	},
	venomrush: {
		name: 'Venom Rush',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Poison") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1041,
		rating: 3,
	},
	mindleap: {
		name: 'Mind Leap',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Psychic") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1042,
		rating: 3,
	},
	stonemomentum: {
		name: 'Stone Momentum',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Rock") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1043,
		rating: 3,
	},
	metallicburst: {
		name: 'Metallic Burst',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Steel") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1044,
		rating: 3,
	},
	tidalsurge: {
		name: 'Tidal Surge',
		onModifyPriority(priority, pokemon, _, move) {
			if (move.type !== "Water") return;
			if (pokemon.hp !== pokemon.maxhp) return;
			return priority + 1;
		},
		num: -1045,
		rating: 3,
	},
	hiveinstinct: {
		name: 'Hive Instinct',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Bug') return;
			this.debug('Hive Instinct boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Bug') return;
			this.debug('Hive Instinct boost');
			return this.chainModify(1.5);
		},
		num: -1046,
		rating: 3.5,
	},
	shadowborn: {
		name: 'Shadowborn',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Dark') return;
			this.debug('Shadowborn boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Dark') return;
			this.debug('Shadowborn boost');
			return this.chainModify(1.5);
		},
		num: -1047,
		rating: 3.5,
	},
	draconicessence: {
		name: 'Draconic Essence',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Dragon') return;
			this.debug('Draconic Essence boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Dragon') return;
			this.debug('Draconic Essence boost');
			return this.chainModify(1.5);
		},
		num: -1048,
		rating: 3.5,
	},
	chargedcore: {
		name: 'Charged Core',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Electric') return;
			this.debug('Charged Core boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Electric') return;
			this.debug('Charged Core boost');
			return this.chainModify(1.5);
		},
		num: -1049,
		rating: 3.5,
	},
	enchantedforce: {
		name: 'Enchanted Force',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Fairy') return;
			this.debug('Enchanted Force boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Fairy') return;
			this.debug('Enchanted Force boost');
			return this.chainModify(1.5);
		},
		num: -1050,
		rating: 3.5,
	},
	warriorswill: {
		name: 'Warrior\'s Will',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Fighting') return;
			this.debug('Warrior\'s Will boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Fighting') return;
			this.debug('Warrior\'s Will boost');
			return this.chainModify(1.5);
		},
		num: -1051,
		rating: 3.5,
	},
	infernalsurge: {
		name: 'Infernal Surge',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Fire') return;
			this.debug('Infernal Surge boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Fire') return;
			this.debug('Infernal Surge boost');
			return this.chainModify(1.5);
		},
		num: -1052,
		rating: 3.5,
	},
	skyborn: {
		name: 'Skyborn',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Flying') return;
			this.debug('Skyborn boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Flying') return;
			this.debug('Skyborn boost');
			return this.chainModify(1.5);
		},
		num: -1053,
		rating: 3.5,
	},
	etherealpresence: {
		name: 'Ethereal Presence',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Ghost') return;
			this.debug('Ethereal Presence boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Ghost') return;
			this.debug('Ethereal Presence boost');
			return this.chainModify(1.5);
		},
		num: -1054,
		rating: 3.5,
	},
	verdantblessing: {
		name: 'Verdant Blessing',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Grass') return;
			this.debug('Verdant Blessing boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Grass') return;
			this.debug('Verdant Blessing boost');
			return this.chainModify(1.5);
		},
		num: -1055,
		rating: 3.5,
	},
	earthspower: {
		name: 'Earth\'s Power',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Ground') return;
			this.debug('Earth Power boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Ground') return;
			this.debug('Earth Power boost');
			return this.chainModify(1.5);
		},
		num: -1056,
		rating: 3.5,
	},
	glacialheritage: {
		name: 'Glacial Heritage',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Ice') return;
			this.debug('Glacial Heritage boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Ice') return;
			this.debug('Glacial Heritage boost');
			return this.chainModify(1.5);
		},
		num: -1057,
		rating: 3.5,
	},
	fundamentalforce: {
		name: 'Fundamental Force',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Normal') return;
			this.debug('Fundamental Force boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Normal') return;
			this.debug('Fundamental Force boost');
			return this.chainModify(1.5);
		},
		num: -1058,
		rating: 3.5,
	},
	toxicveins: {
		name: 'Toxic Veins',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Poison') return;
			this.debug('Toxic Veins boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Poison') return;
			this.debug('Toxic Veins boost');
			return this.chainModify(1.5);
		},
		num: -1059,
		rating: 3.5,
	},
	mindforce: {
		name: 'Mind Force',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Psychic') return;
			this.debug('Mind Force boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Psychic') return;
			this.debug('Mind Force boost');
			return this.chainModify(1.5);
		},
		num: -1060,
		rating: 3.5,
	},
	stoneborn: {
		name: 'Stoneborn',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Rock') return;
			this.debug('Stoneborn boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Rock') return;
			this.debug('Stoneborn boost');
			return this.chainModify(1.5);
		},
		num: -1061,
		rating: 3.5,
	},
	metallicsoul: {
		name: 'Metallic Soul',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Steel') return;
			this.debug('Metallic Soul boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Steel') return;
			this.debug('Metallic Soul boost');
			return this.chainModify(1.5);
		},
		num: -1062,
		rating: 3.5,
	},
	aquaflow: {
		name: 'Aqua Flow',
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Water') return;
			this.debug('Aqua Flow boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Water') return;
			this.debug('Aqua Flow boost');
			return this.chainModify(1.5);
		},
		num: -1063,
		rating: 3.5,
	},
	hauntify: {
		name: 'Hauntify',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Ghost";
			move.typeChangerBoosted = this.effect;
		},
		num: -1064,
		rating: 4,
	},
	verdantforce: {
		name: 'Verdant Force',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Grass";
			move.typeChangerBoosted = this.effect;
		},
		num: -1065,
		rating: 4,
	},
	terranize: {
		name: 'Terranize',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Ground";
			move.typeChangerBoosted = this.effect;
		},
		num: -1066,
		rating: 4,
	},
	toxify: {
		name: 'Toxify',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Poison";
			move.typeChangerBoosted = this.effect;
		},
		num: -1067,
		rating: 4,
	},
	petrify: {
		name: 'Petrify',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Rock";
			move.typeChangerBoosted = this.effect;
		},
		num: -1068,
		rating: 4,
	},
	ferronize: {
		name: 'Ferronize',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Steel";
			move.typeChangerBoosted = this.effect;
		},
		num: -1069,
		rating: 4,
	},
	aquify: {
		name: 'Aquify',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Water";
			move.typeChangerBoosted = this.effect;
		},
		num: -1070,
		rating: 4,
	},
	psionize: {
		name: 'Psionize',
		onBasePower(_, _pokemon, _target, move) {
			if (move.typeChangerBoosted !== this.effect) return;
			return this.chainModify([4915, 4096]); // 1.2x
		},
		onModifyType(move) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance',
				'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type !== 'Normal') return;
			if (noModifyType.includes(move.id)) return;
			move.type = "Psychic";
			move.typeChangerBoosted = this.effect;
		},
		num: -1071,
		rating: 4,
	},
	rightsidedown: {
		name: 'Right Side Down',
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add("-ability", pokemon, "Right Side Down", "boost");
					activated = true;
				}
				if (target.volatiles["substitute"]) {
					this.add("-immune", target);
				} else {
					for (let i in target.boosts) {
						if (target.boosts[i as keyof BoostsTable] === 0) continue;
						target.boosts[i as keyof BoostsTable] =
							-target.boosts[i as keyof BoostsTable];
					}
					this.add(
						"-invertboost",
						target,
						"[from] ability: Right Side Down"
					);
				}
			}
		},
		flags: {},
		rating: 3.5,
		num: -1072,
	},
	gravitygenerator: {
		name: "Gravity Generator",
		onStart(pokemon) {
			if (this.field.getPseudoWeather('gravity')) {
				this.field.removePseudoWeather('gravity');
				this.add('-ability', pokemon, 'Gravity Generator');
				this.add('-fieldend', 'move: Gravity', '[from] ability: Gravity Generator');
			} else {
				this.field.addPseudoWeather('gravity');
				this.add('-ability', pokemon, 'Gravity Generator');
				//this.add('-fieldstart', 'move: Gravity', '[from] ability: Gravity Generator');
			}
		},
		flags: {},
		rating: 3.5,
		num: -1074,
	},
	windwalker: {
		name: "Wind Walker",
		onStart(pokemon) {
			if (pokemon.side.getSideCondition('tailwind')) {
				pokemon.side.removeSideCondition('tailwind');
				this.add('-ability', pokemon, 'Wind Walker');
				this.add('-sideend', pokemon.side, 'move: Tailwind', '[from] ability: Wind Walker');
			} else {
				pokemon.side.addSideCondition('tailwind');
				this.add('-ability', pokemon, 'Wind Walker');
				//this.add('-sidestart', pokemon.side, 'move: Tailwind', '[from] ability: Wind Walker');
			}
		},
		flags: {},
		rating: 3.5,
		num: -1073,
	},
	cleanfreak: {
		name: 'Clean Freak',
		onStart(pokemon) {
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			sideConditions.forEach(condition => {
				pokemon.side.removeSideCondition(condition);
				this.add('-sideend', pokemon.side, this.dex.conditions.get(condition).name, '[from] ability: Clean Freak', `[of] ${pokemon}`);
			});
		},
		flags: {},
		rating: 3.5,
		num: -1075,
	},
	terraineater: {
		name: 'Terrain Eater',
		onStart(pokemon) {
			if (!(this.field.terrain && pokemon.isGrounded())) return;
			this.add('-ability', pokemon, 'Terrain Eater');
			this.field.clearTerrain();
		},
		flags: {},
		rating: 3.5,
		num: -1076,
	},
	ejected: {
		name: 'Ejected',
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 5);
			this.add('-heal', pokemon, pokemon.getHealth, '[from] ability: Ejected');
		},
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			if (pokemon.hp > pokemon.baseMaxhp / 2) return;
			if (!this.canSwitch(pokemon.side) || pokemon.forceSwitchFlag || pokemon.switchFlag) return;
			pokemon.switchFlag = true;
			this.add('-activate', pokemon, 'ability: Ejected');
		},
		flags: {},
		rating: 1,
		num: -1077,
	},
	dnatracing: {
		name: 'DNA Tracing',
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.id !== 'synchronoise') return;
			move.ignoreImmunity = true;
			move.onEffectiveness = function () {
				return 0;
			};
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon, target, move) {
			if (move.category === 'Status' || move.id === 'reflecttype') return;
			if (!target && pokemon.volatiles['dnatracing']) return;
			this.add('-ability', pokemon, 'DNA Tracing');
			pokemon.addVolatile('dnatracing');
			pokemon.volatiles['dnatracing'].originalTypes = pokemon.getTypes(true);
			this.actions.useMove('reflecttype', pokemon, { target });
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (!pokemon.volatiles['dnatracing']?.originalTypes) return;
			const originalTypes = pokemon.volatiles['dnatracing'].originalTypes;
			this.add('-ability', pokemon, 'DNA Tracing');
			this.add('-message', `${pokemon.name}'s DNA Tracing reverted its type!`);
			pokemon.setType(originalTypes);
			pokemon.removeVolatile('dnatracing');
		},
		flags: {},
		rating: 3.5,
		num: -1078,
	},
	sheerwillpower: {
		name: 'Sheer Willpower',
		onModifyMovePriority: 1,
		onModifyMove(move, source, target) {
			if (move.flags['recharge']) {
				delete move.self?.volatileStatus;
				delete move.flags['recharge'];
			}
			if (!move.flags['charge']) return;
			move.onTryMove = (attacker, defender, move) => {
				if (attacker.removeVolatile(move.id)) {
					return;
				}
				this.add('-prepare', attacker, move.name);
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
			
			};

			this.add('-ability', source, 'Sheer Willpower');
			this.add('-message', `${source.name}'s ${move.name} hits instantly!`);


		},
		flags: {},
		rating: 4.5,
		num: -1079,
	},
	repetitiveforce: {
		name: 'Repetitive Force',
		onStart(pokemon) {
			pokemon.addVolatile('repetitiveforce');
		},
		onSwitchIn(pokemon) {
			pokemon.addVolatile('repetitiveforce');
		},
		onSwitchOut(pokemon) {
			pokemon.removeVolatile('repetitiveforce');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('repetitiveforce');
		},
		onBeforeMove(pokemon, target, move) {
			const repetitiveForce = pokemon.volatiles['repetitiveforce'];
			if (!repetitiveForce) return;
			
			// Check if this is a different move than last time
			if (repetitiveForce.lastMove && move.id !== repetitiveForce.lastMove) {
				// Reset counter and last move when using a different move
				repetitiveForce.counter = 0;
				repetitiveForce.lastMove = '';
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.category === 'Status') return;
			
			const repetitiveForce = attacker.volatiles['repetitiveforce'];
			if (!repetitiveForce) return;
			
			// If this is the first move, just record it and return
			if (!repetitiveForce.lastMove) {
				repetitiveForce.lastMove = move.id;
				repetitiveForce.counter = 0;
				return;
			}
			
			// If using the same move as last time, increase counter
			if (move.id === repetitiveForce.lastMove) {
				repetitiveForce.counter = (repetitiveForce.counter || 0) + 1;
			}
			
			// Update last move
			repetitiveForce.lastMove = move.id;
			
			const boostTable = [1, 1.2, 1.4, 1.6, 1.8, 2];
			const boostIndex = Math.min(repetitiveForce.counter, 5);
			const boost = boostTable[boostIndex];
			
			if (repetitiveForce.counter > 0) {
				this.add('-activate', attacker, 'ability: Repetitive Force');
				this.add('-message', `${attacker.name}'s consecutive hits boost its power (x${boost.toFixed(1)})`);
				return this.chainModify(boost);
			}
		},
		condition: {
			noCopy: true,
			onStart(pokemon) {
				this.effectState.counter = 0;
				this.effectState.lastMove = '';
			},
		},
		flags: {},
		rating: 3.5,
		num: -1080,
	},
	petrifyinggaze: {
		name: 'Petrifying Gaze',
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Petrifying Gaze', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute'])
					this.add('-immune', target);
				else
					this.boost({ spe: -1 }, target, pokemon, null, true);
			}
		},
		flags: {},
		rating: 3.5,
		num: -1081,
	},
	rezero: {
		name: 'ReZero',
		onStart(pokemon) {
			this.add('-ability', pokemon, 'ReZero');
			this.add('-message', 'The battle state has been reset to zero!');
			for (const active of this.getAllActive()) {
				active.clearBoosts();
				this.add('-clearboost', active);
			}

			for (const side of this.sides) {
				const hazards = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
				for (const hazard of hazards) {
					if (!side.sideConditions[hazard]) continue;
					side.removeSideCondition(hazard);
					this.add('-sideend', side, this.dex.conditions.get(hazard).name, '[from] ability: ReZero');
				}

				const screens = ['reflect', 'lightscreen', 'auroraveil'];
				for (const screen of screens) {
					if (!side.sideConditions[screen]) continue;
					side.removeSideCondition(screen);
					this.add('-sideend', side, this.dex.conditions.get(screen).name, '[from] ability: ReZero');
				}

				if (this.field.weather) {
					const weatherName = this.field.weather;
					this.field.clearWeather();
					this.add('-weather', 'none', '[from] ability: ReZero');
					this.add('-message', `${weatherName} weather was cleared!`);
				}

				if (this.field.terrain) {
					const terrainName = this.field.terrain;
					this.field.clearTerrain();
					this.add('-terrain', 'none', '[from] ability: ReZero');
					this.add('-message', `${terrainName} terrain was cleared!`);
				}

				const rooms = ['trickroom', 'magicroom', 'wonderroom', 'gravity'];
				for (const room of rooms) {
					if (!this.field.pseudoWeather[room]) continue;
					this.field.removePseudoWeather(room);
					this.add('-fieldend', this.dex.conditions.get(room).name, '[from] ability: ReZero');
				}
			}
		},
		flags: {},
		rating: 3.5,
		num: -1082,
	},
	ancienttrungnology: {
		name: "Ancient Trungnology",
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(3);
		},
		flags: {},
		rating: 5,
		num: -1083,
	},
	wonderwonder: {
		name: "Wonder Wonder",
		onStart(pokemon) {
			if (this.field.getPseudoWeather('wonderroom')) {
				this.field.removePseudoWeather('wonderroom');
				this.add('-ability', pokemon, 'Wonder Wonder');
				this.add('-fieldend', 'move: Wonder Room', '[from] ability: Wonder Wonder');
			} else {
				this.field.addPseudoWeather('wonderroom');
				this.add('-ability', pokemon, 'Wonder Wonder');
				//this.add('-fieldstart', 'move: Wonder Room', '[from] ability: Wonder Wonder');
			}
		},
		flags: {},
		rating: 3.5,
		num: -1084,
	},
	speedflipper: {
		name: "Speed Flipper",
		onStart(pokemon) {
			if (this.field.getPseudoWeather('trickroom')) {
				this.field.removePseudoWeather('trickroom');
				this.add('-ability', pokemon, 'Speed Flipper');
				this.add('-fieldend', 'move: Trick Room', '[from] ability: Speed Flipper');
			} else {
				this.field.addPseudoWeather('trickroom');
				this.add('-ability', pokemon, 'Speed Flipper');
				//this.add('-fieldstart', 'move: Trick Room', '[from] ability: Speed Flipper');
			}
		},
		flags: {},
		rating: 3.5,
		num: -1085,
	},
	stancechangetwo: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Runerigus-Hisui' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'protect') return;
			const targetForme = (move.id === 'protect' ? 'Runerigus-Hisui' : 'Runerigus-Hisui-Attack');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Stance Change Two",
		rating: 4,
		num: -1086,
	},
	boneeater: {
		name: "Bone Eater",
		onTryHit(target, source, move) {
			if (move.type === 'Rock') {
				this.heal(target.baseMaxhp / 4);
				this.add('-immune', target, '[from] ability: Bone Eater');
				return null;
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.side.getSideCondition('stealthrock')) {
				this.heal(pokemon.baseMaxhp / 8);
				this.add('-heal', pokemon, pokemon.getHealth, '[from] ability: Bone Eater');
				this.add('-sideend', pokemon.side, 'move: Stealth Rock', '[from] ability: Bone Eater');
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect?.id === 'stealthrock') {
				return false;
			}
		},
		flags: {breakable: 1},
		rating: 3.5,
		num: -1087,
	},
	restorationinterruption: {
		name: "Restoration Interruption",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Restoration Interruption');
			this.add('-message', 'All healing is prevented by Restoration Interruption!');
		},
		onTryHeal(damage, target, source, effect) {
			//if (effect?.id === 'breathe' || effect?.id === 'ingrain' || effect?.id === 'shoreup') return damage;
			this.add('-activate', this.effectState.target, 'ability: Restoration Interruption');
			return false;
		},
		onAnyTryHeal(damage, target, source, effect) {
			//if (effect?.id === 'breathe' || effect?.id === 'ingrain' || effect?.id === 'shoreup') return damage;
			if (target === this.effectState.target) return;
			this.add('-activate', this.effectState.target, 'ability: Restoration Interruption');
			return false;
		},
		flags: {},
		rating: 4,
		num: -1088,
	},
	adrenalinerush: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ spe: length }, source);
			}
		},
		flags: {},
		name: "Adrenaline Rush",
		rating: 3,
		num: -1089,
	},
	departingcurse: {
		name: "Departing Curse",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-ability', target, 'Departing Curse');
				source.addVolatile('curse');
				this.add('-start', source, 'move: Curse', '[from] ability: Departing Curse');
			}
		},
		flags: {},
		rating: 2.5,
		num: -1090,
	},
	lychbane: {
		name: "Lych Bane",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				let totalBoosts = 0;
				const boosts = target.boosts;
				for (const stat in boosts) {
					if (boosts[stat as BoostID] > 0) {
						totalBoosts += boosts[stat as BoostID]!;
					}
				}
				
				if (totalBoosts > 0) {
					if (!activated) {
						this.add('-ability', pokemon, 'Lych Bane');
						activated = true;
					}
					const healAmount = pokemon.baseMaxhp * totalBoosts / 8;
					this.heal(healAmount, pokemon, pokemon);
					target.clearBoosts();
					this.add('-clearboost', target, '[from] ability: Lych Bane');
				}
			}
		},
		flags: {},
		rating: 3.5,
		num: -1091,
	},
	sleepingdisaster: {
		name: "Sleeping Disaster",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status === 'slp') {
				this.debug('Sleeping Disaster boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (pokemon.status === 'slp') {
				this.debug('Sleeping Disaster boost');
				return this.chainModify(2);
			}
		},
		onModifySpePriority: 5,
		onModifySpe(spe, pokemon) {
			if (pokemon.status === 'slp') {
				this.debug('Sleeping Disaster boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		rating: 3,
		num: -1092,
	},
	holychime: {
		name: "Holy Chime",
		onSwitchIn(pokemon) {
			this.add('-ability', pokemon, 'Holy Chime');
			this.add('-activate', pokemon, 'ability: Holy Chime');
			
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally.status) {
					ally.cureStatus();
					success = true;
				}
			}
			
			if (success) {
				this.add('-message', 'A soothing chime healed the team\'s status conditions!');
			}
		},
		flags: {},
		rating: 2.5,
		num: -1093,
	},
	lifesteal: {
		name: "Life Steal",
		onModifyMove(move) {
			if (!move || move.category === 'Status') return;
			if (!move.drain) move.drain = [1, 4];
		},
		flags: {},
		rating: 3.5,
		num: -1094,
	},
	weaknessenhancer: {
		name: "Weakness Enhancer",
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category === 'Status' || !move.totalDamage) return;
			if (target.getMoveHitData(move).typeMod > 0) {
				this.boost({atk: 1}, source, source, this.effect);
			}
		},
		flags: {},
		rating: 3.5,
		num: -1095,
	},
	laststand: {
		name: "Last Stand",
		onModifyMove(move, pokemon) {
			if (pokemon.hp > pokemon.maxhp / 4) return;
			if (move.multihit) return;
			if (move.category === 'Status') return;
			
			if (!move.multihit) {
				move.multihit = 2;
			}
		},
		onBasePowerPriority: 7,
		onBasePower(basePower, pokemon, target, move) {
			if (pokemon.hp > pokemon.maxhp / 4) return;
			if (move.multihit === 2 && move.category !== 'Status') {
				return this.chainModify(0.75);
			}
		},
		flags: {},
		rating: 4,
		num: -1096,
	},
	rouletteroll: {
		name: "Roulette Roll",
		onBasePowerPriority: 8,
		onBasePower(basePower, pokemon, target, move) {
			if (move.category === 'Status') return;
			
			const roll = this.random(4); // 0, 1, 2, or 3
			
			switch (roll) {
				case 0: // 0.25x damage
					this.add('-activate', pokemon, 'ability: Roulette Roll');
					this.add('-message', 'Roulette Roll: Low power hit!');
					return this.chainModify(0.25);
				case 1: // 1x damage (normal)
					return; // No modification
				case 2: // 3x damage
					this.add('-activate', pokemon, 'ability: Roulette Roll');
					this.add('-message', 'Roulette Roll: High power hit!');
					return this.chainModify(3);
				case 3: // Heal opponent
					this.add('-activate', pokemon, 'ability: Roulette Roll');
					this.add('-message', 'Roulette Roll: Opponent healed!');
					this.heal(target.baseMaxhp / 2, target, pokemon);
					return this.chainModify(0); // No damage dealt
			}
		},
		flags: {},
		rating: 1,
		num: -1097,
	},
	cursedhusk: {
		name: "Cursed Husk",
		onStart(pokemon) {
			this.boost({def: 1, spd: 1, atk: -1, spa: -1, spe: -1}, pokemon, pokemon, this.effect);
		},
		onDamagingHit(damage, target, source, move) {
			if (this.randomChance(1, 5)) { // 20% chance
				this.boost({def: -1, spd: -1}, source, target, null, true);
			}
		},
		flags: {},
		rating: 3,
		num: -1098,
	},
	flashattack: {
		name: "Flash Attack",
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.category === 'Status') return;
			
			// Reverse of Analytic: boost if moving before all other active Pokémon
			let boosted = true;
			for (const active of this.getAllActive()) {
				if (active === pokemon) continue;
				if (this.queue.willMove(active)) {
					// If any other Pokémon will move later, user is not last
					// So for Flash Attack, we want the opposite: boost if NO other Pokémon will move later
					boosted = false;
					break;
				}
			}
			
			// If boosted is still true, it means user is moving last (no one will move after)
			// But we want the user to be moving FIRST, so we need to invert this
			if (!boosted) {
				this.debug('Flash Attack boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		rating: 3,
		num: -1099,
	},
	crabshield: {
		name: "Crab Shield",
		onSourceModifyDamage(damage, source, target, move) {
			// Check if this is the first turn the target is active AND it's being targeted by an attack
			if (target.activeTurns === 0 && move.target === 'normal') {
				this.debug('Crab Shield weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		rating: 3,
		num: -1100,
	},
	caprice: {
		name: "Caprice",
		onSwitchIn(pokemon) {
			pokemon.abilityState.capriceUsed = false;
		},
		onModifyCritRatio(critRatio, source, target, move) {
			if (move.category === 'Status') return;
			if (!source.abilityState.capriceUsed) {
				source.abilityState.capriceUsed = true;
				this.add('-activate', source, 'ability: Caprice');
				return 5; // Guaranteed critical hit
			}
		},
		flags: {},
		rating: 3.5,
		num: -1101,
	},
	equinox: {
		name: "Equinox",
		onModifySpe(spe, pokemon) {
			if (pokemon.hp === pokemon.maxhp) {
				this.debug('Equinox speed boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		rating: 3,
		num: -1102,
	},
	vulcanarmor: {
		name: "Vulcan Armor",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Vulcan Armor');
				this.heal(pokemon.baseMaxhp / 8);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.id === 'brn') {
				this.add('-activate', target, 'ability: Vulcan Armor');
				return false;
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status === 'brn') {
				return this.chainModify(2); // Prevents attack reduction
			}
		},
		flags: {},
		rating: 3.5,
		num: -1103,
	},
	whisper: {
		name: "Whisper",
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category === 'Status') return;
			if (target.getMoveHitData(move).crit) {
				this.boost({spe: 1}, source, source, this.effect);
			}
		},
		flags: {},
		rating: 3,
		num: -1104,
	},
	elementalking: {
		name: "Elemental King",
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Ground' && move.type !== 'Water' && move.type !== 'Fire') return;
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Ground' && move.type !== 'Water' && move.type !== 'Fire') return;
			return this.chainModify(1.5);
		},
		flags: {},
		rating: 4,
		num: -1105,
	},
	precision: {
		name: "Precision",
		// No Guard effect
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		// Punching Glove effect
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Precision punch boost');
				return this.chainModify(1.1);
			}
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['punch']) {
				move.ignoreImmunity = true;
			}
		},
		flags: {},
		rating: 4,
		num: -1106,
	},
	theoathkeeper: {
	name: "The Oath Keeper",
	onModifyCritRatio(critRatio, source, target, move) {
		if (target.hp <= target.maxhp * 0.3) {
			return 5; // Guaranteed critical hit
		}
	},
	flags: {},
	rating: 3.5,
	num: -1107,
	},
	voltagecharge: {
		name: "Voltage Charge",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.type === 'Electric') {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 20,
					status: 'par',
				});
			}
		},
		flags: {},
		rating: 2.5,
		num: -1108,
	},
	superconductor: {
		name: "Super Conductor",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric' && defender.status === 'par') {
				this.debug('Super Conductor boost');
				return this.chainModify(1.3);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric' && defender.status === 'par') {
				this.debug('Super Conductor boost');
				return this.chainModify(1.3);
			}
		},
		flags: {},
		rating: 3,
		num: -1109,
	},
	deitypenalization: {
		name: "Deity Penalization",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-ability', target, 'Deity Penalization');
				this.damage(source.baseMaxhp / 5, source, target);
			}
		},
		flags: {},
		rating: 2.5,
		num: -1110,
	},
	fallingflowers: {
		name: "Falling Flowers",
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Grass') return;
			this.debug('Falling Flowers boost');
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Grass') return;
			this.debug('Falling Flowers boost');
			return this.chainModify(1.5);
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Grass') {
				this.debug('Falling Flowers weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		rating: 4,
		num: -1111,
	},
	redsunrise: {
		name: "Red Sunrise",
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category === 'Status') return;
			if (!source.hasType(move.type)) return; // Not STAB
			if (!target.hp) return; // Target already fainted
			
			// Check if target is at 10% or less HP after the attack
			if (target.hp <= target.maxhp * 0.1) {
				this.add('-activate', source, 'ability: Red Sunrise');
				this.add('-message', 'Red Sunrise ensures the faint!');
				this.damage(target.hp, target, source, this.dex.conditions.get('redsunrise'));
			}
		},
		flags: {},
		rating: 3,
		num: -1112,
	},
	bodyofsmith: {
		name: "Body of Smith",
		onDamagingHit(damage, target, source, move) {
			const damageTaken = damage;
			const maxHp = target.maxhp;
			const damagePercentage = (damageTaken / maxHp) * 100;
			
			// Calculate how many 30% increments were taken
			const boosts = Math.floor(damagePercentage / 30);
			if (boosts > 0) {
				this.boost({atk: boosts}, target, target, this.effect);
			}
		},
		flags: {},
		rating: 3,
		num: -1113,
	},
	windtalk: {
		name: "Windtalk",
		onModifyMovePriority: -1,
		onModifyMove(move) {
			const windMoves = ['hurricane', 'heatwave', 'blizzard', 'twister', 'aircutter', 'gust', 'blizzard', 'aeroblast', 'icywind', 'petalblizzard','fairywind', 'springtidestorm', 'bleakwindstorm', 'wildboltstorm', 'sandsearstorm'];
			if (windMoves.includes(move.id)) {
				if (!move.secondaries) move.secondaries = [];
				move.secondaries.push({
					chance: 20,
					volatileStatus: 'confusion',
				});
			}
		},
		flags: {},
		rating: 2.5,
		num: -1114,
	},
	tamerofdemons: {
		name: "Tamer of Demons",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			this.debug('Tamer of Demons boost');
			return this.chainModify(1.5);
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			this.debug('Tamer of Demons boost');
			return this.chainModify(1.5);
		},
		onSourceModifyDamage(damage, source, target, move) {
			this.debug('Tamer of Demons weaken');
			return this.chainModify(1.25);
		},
		flags: {},
		rating: 3,
		num: -1115,
	},
	bloodlust: {
		name: "Bloodlust",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.hp === defender.maxhp) {
				this.debug('Bloodlust boost');
				return this.chainModify(2);
			} else {
				this.debug('Bloodlust weaken');
				return this.chainModify(0.75);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.hp === defender.maxhp) {
				this.debug('Bloodlust boost');
				return this.chainModify(2);
			} else {
				this.debug('Bloodlust weaken');
				return this.chainModify(0.75);
			}
		},
		flags: {},
		rating: 3,
		num: -1116,
	},
	combatring: {
		name: "Combat Ring",
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Fighting') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Fighting')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		rating: 4,
		num: -1117,
	},
	seacradle: {
		name: "Sea Cradle",
		onSwitchIn(pokemon) {
			this.add('-ability', pokemon, 'Sea Cradle');
			pokemon.addVolatile('aquaring');
			this.add('-start', pokemon, 'Aqua Ring', '[from] ability: Sea Cradle');
		},
		flags: {},
		rating: 3,
		num: -1118,
	},
	crumblingtemple: {
		name: "Crumbling Temple",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (!source.side.getSideCondition('stealthrock')) {
					source.side.addSideCondition('stealthrock');
				}
			}
		},
		flags: {},
		rating: 3,
		num: -1119,
	},
	primevalflames: {
		name: "Primeval Flames",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Primeval Flames boost');
				let multiplier = 1.3;
				if (defender.hasType('Dragon')) {
					multiplier *= 2;
				}
				return this.chainModify(multiplier);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Primeval Flames boost');
				let multiplier = 1.3;
				if (defender.hasType('Dragon')) {
					multiplier *= 2;
				}
				return this.chainModify(multiplier);
			}
		},
		flags: {},
		rating: 4,
		num: -1120,
	},
	worldtree: {
		name: "World Tree",
		onFoeTrapPokemon(pokemon) {
			if (this.field.isTerrain('grassyterrain') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (this.field.isTerrain('grassyterrain')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		rating: 3.5,
		num: -1121,
	},
	liquidarmor: {
		name: "Liquid Armor",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (source.getTypes().join() === 'Water' && !source.volatiles['typechange']) return;
				if (!source.setType('Water')) return;
				this.add('-start', source, 'typechange', 'Water', '[from] ability: Liquid Armor');
			}
		},
		flags: {},
		rating: 2.5,
		num: -1122,
	},
	gigacannon: {
		name: "Giga Cannon",
		onModifySpAPriority: 5,
		onModifySpA(spa) {
			return this.chainModify(1.5);
		},
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Giga Cannon");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		flags: {},
		rating: 4,
		num: -1124,
	},
	aerodynamic: {
		name: "Aerodynamic",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Flying') {
				this.add('-immune', target, '[from] ability: Aerodynamic');
				this.boost({spe: 1}, target, target, this.effect);
				return null;
			}
		},
		flags: {breakable: 1},
		rating: 3,
		num: -1125,
	},
	avenger: {
		name: "Avenger",
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.side.faintedLastTurn) {
				this.debug('Avenger boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		rating: 3,
		num: -1126,
	},
	fishsenses: {
		name: "Fish Senses",
		onStart(pokemon) {
			if (pokemon.getTypes().join() === 'Water' || !pokemon.addType('Water')) return;
			this.add('-start', pokemon, 'typeadd', 'Water', '[from] ability: Fish Senses');
		},
		flags: {},
		rating: 3,
		num: -1127,
	},
	moltenlava: {
		name: "Molten Lava",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && defender.hasType('Rock')) {
				this.debug('Molten Lava boost');
				return this.chainModify(4);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && defender.hasType('Rock')) {
				this.debug('Molten Lava boost');
				return this.chainModify(4);
			}
		},
		flags: {},
		rating: 3.5,
		num: -1128,
	},
	icedew: {
		name: "Ice Dew",
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ice') {
				this.add('-immune', target, '[from] ability: Ice Dew');
				this.boost({atk: 1}, target, target, this.effect);
				return null;
			}
		},
		flags: {breakable: 1},
		rating: 3,
		num: -1129,
	},
	funguy: {
		name: "Fun Guy",
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (source.volatiles['leechseed'] || source.hasType('Grass')) return;
				source.addVolatile('leechseed', target);
				this.add('-start', source, 'move: Leech Seed', '[from] ability: Fun Guy');
			}
		},
		flags: {},
		rating: 3,
		num: -1130,
	},
	rusting: {
		name: "Rusting",
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			for (const target of this.getAllActive()) {
				if (target.hasType('Steel') && target !== pokemon) {
					this.damage(target.baseMaxhp / 10, target, pokemon);
				}
			}
		},
		flags: {},
		rating: 2.5,
		num: -1131,
	},
	fairytale: {
		name: "Fairy Tale",
		onStart(pokemon) {
			if (pokemon.getTypes().join() === 'Fairy' || !pokemon.addType('Fairy')) return;
			this.add('-start', pokemon, 'typeadd', 'Fairy', '[from] ability: Fairy Tale');
		},
		flags: {},
		rating: 3,
		num: -1132,
	},
	moonblessing: {
		name: "Moon Blessing",
		onModifyAtk(_, _attacker, _defender, move) {
			if (move.type !== 'Fairy') return;
			return this.chainModify(1.5);
		},
		onModifySpA(_, _attacker, _defender, move) {
			if (move.type !== 'Fairy') return;
			return this.chainModify(1.5);
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id === 'moonlight') {
				this.add('-activate', target, 'ability: Moon Blessing');
				return this.chainModify(1.5); // 75% healing instead of 50%
			}
		},
		flags: {},
		rating: 3.5,
		num: -1133,
	},
	cowardess: {
		name: "Cowardess",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) return;
			
			let statsLowered = false;
			for (const stat in boost) {
				if (boost[stat as BoostID]! < 0) {
					statsLowered = true;
					break;
				}
			}
			
			if (statsLowered && this.canSwitch(target.side)) {
				this.add('-activate', target, 'ability: Cowardess');
				target.switchFlag = true;
			}
		},
		flags: {},
		rating: 1,
		num: -1134,
	},
	supremegrudge: {
		name: "Supreme Grudge",
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.add('-ability', target, 'Supreme Grudge');
				const moveIndex = source.moveSlots.findIndex(ms => ms.id === move.id);
				if (moveIndex >= 0) {
					source.moveSlots[moveIndex].pp = 0;
					this.add('-activate', target, 'ability: Supreme Grudge', move.name);
				}
			}
		},
		flags: {},
		rating: 2.5,
		num: -1135,
	},
	weatherabsorber: {
		name: "Weather Absorber",
		onSwitchIn(pokemon) {
			if (!this.field.weather) return;
			
			const weather = this.field.weather;
			this.field.clearWeather();
			this.add('-activate', pokemon, 'ability: Weather Absorber');
			this.add('-weather', 'none', '[from] ability: Weather Absorber');
			
			switch (weather) {
				case 'raindance':
				case 'primordialsea':
					this.boost({spa: 2}, pokemon, pokemon, this.effect);
					break;
				case 'sunnyday':
				case 'desolateland':
					this.boost({atk: 2}, pokemon, pokemon, this.effect);
					break;
				case 'sandstorm':
					this.boost({def: 2}, pokemon, pokemon, this.effect);
					break;
				case 'hail':
				case 'snow':
					this.boost({spd: 2}, pokemon, pokemon, this.effect);
					break;
			}
		},
		flags: {},
		rating: 3.5,
		num: -1136,
	},
	textureswap: {
		name: "Texture Swap",
		onTryHit(target, source, move) {
			if (target.isSemiInvulnerable()) return;
			
			const types: string[] = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];
			
			// Randomly choose single or dual type
			const typeCount = this.random(2) + 1; // 1 or 2 types
			const newTypes: string[] = [];
			for (let i = 0; i < typeCount; i++) {
				const randomType = this.sample(types);
				if (!newTypes.includes(randomType)) {
					newTypes.push(randomType);
				}
			}
			
			target.setType(newTypes);
			this.add('-start', target, 'typechange', newTypes.join('/'), '[from] ability: Texture Swap');
		},
		flags: {},
		rating: 3,
		num: -1137,
	},
	explosivetantrum: {
		name: "Explosive Tantrum",
		onAfterEachBoost(boost, target, source, effect) {
			if (!source) return;
			// Allow self-inflicted drops OR drops from enemies, but not allies
			if (source !== target && target.isAlly(source)) return;
			
			let statsLowered = false;
			for (const stat in boost) {
				if (boost[stat as BoostID]! < 0) {
					statsLowered = true;
					break;
				}
			}
			
			if (statsLowered) {
				// Check if the stat drop came from Curse
				const isCurse = effect?.id === 'curse';
				
				if (isCurse) {
					// Give +2 Attack boost for Curse
					this.boost({atk: 2}, target, target, this.effect);
					this.add('-activate', target, 'ability: Explosive Tantrum');
					this.add('-message', `${target.name}'s Explosive Tantrum triggers a massive Attack boost from Curse!`);
				} else {
					// Normal +1 Attack boost for other stat drops
					this.boost({atk: 1}, target, target, this.effect);
					this.add('-activate', target, 'ability: Explosive Tantrum');
				}
				
				this.actions.useMove('explosion', target);
			}
		},
		flags: {},
		rating: 2,
		num: -1138,
	},
	teraslayer: {
		name: "Tera Slayer",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.terastallized) {
				this.debug('Tera Slayer boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.terastallized) {
				this.debug('Tera Slayer boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		rating: 4,
		num: -1139,
	},
	megahunter: {
		name: "Mega Hunter",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.volatiles['dynamax'] || defender.species.name.includes('-Mega') || defender.species.name.includes('-Primal')) {
				this.debug('Mega Hunter boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.volatiles['dynamax'] || defender.species.name.includes('-Mega') || defender.species.name.includes('-Primal')) {
				this.debug('Mega Hunter boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		rating: 4,
		num: -1140,
	},
	poseidon: {
		name: "Poseidon",
		onSourceModifyDamage(damage, source, target, move) {
			if (['raindance', 'primordialsea'].includes(target.effectiveWeather())) {
				this.debug('Poseidon weaken');
				return this.chainModify(0.8);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				if (pokemon.status) {
					this.add('-activate', pokemon, 'ability: Poseidon');
					pokemon.cureStatus();
				}
			}
		},
		flags: {breakable: 1},
		rating: 4,
		num: -1141,
	},
	souldrain: {
		name: "Soul Drain",
		onDamagingHit(damage, target, source, move) {
			const healAmount = damage * 0.3;
			this.heal(healAmount, target, target);
		},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp <= pokemon.maxhp * 0.7 && pokemon.species.id === 'cofagrigusmegasealed') {
				this.add('-activate', pokemon, 'ability: Soul Drain');
				pokemon.formeChange('Cofagrigus-Mega (Unsealed)', this.effect, true);
			}
		},
		flags: {},
		rating: 3.5,
		num: -1142,
	},
	soultouch: {
		name: "Soul Touch",
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category !== 'Status' && move.totalDamage) {
				const healAmount = move.totalDamage * 0.5;
				this.heal(healAmount, source, source);
			}
		},
		onResidualOrder: 5,
		onResidualSubOrder: 1,
		onResidual(pokemon) {
			if (pokemon.hp >= pokemon.maxhp * 0.7 && pokemon.species.id === 'cofagrigusmegaunsealed') {
				this.add('-activate', pokemon, 'ability: Soul Touch');
				pokemon.formeChange('Cofagrigus-Mega (Sealed)', this.effect, true);
			}
		},
		flags: {},
		rating: 4,
		num: -1143,
	},
	guardianoftheabyss: {
		name: "Guardian of the Abyss",
		onAnyPrepareHit(source, target, move) {
			if (target !== this.effectState.target) return;
			if (move.category === 'Status') return;
			
			// Store original ability
			const originalAbility = source.getAbility();
			if (originalAbility.flags['cantsuppress'] || originalAbility.id === 'guardianoftheabyss') return;
			
			// Temporarily change opponent's ability to "No Ability"
			source.abilityState.originalAbility = originalAbility.id;
			source.setAbility('noability', target, this.effect);
			
			// Make move ignore abilities (prevents type changes, damage boosts, etc.)
			move.ignoreAbility = true;
		},
		onFaint(target, source, effect) {
			// Restore ability if Pokémon faints during the attack
			if (source && source.abilityState.originalAbility) {
				source.setAbility(source.abilityState.originalAbility, this.effectState.target, this.effect);
				delete source.abilityState.originalAbility;
			}
		},
		onAfterMove(source, target, move) {
			// Restore opponent's original ability after ANY move completes
			for (const active of this.getAllActive()) {
				if (active.abilityState.originalAbility) {
					active.setAbility(active.abilityState.originalAbility, this.effectState.target, this.effect);
					delete active.abilityState.originalAbility;
				}
			}
		},
		flags: {breakable: 1},
		rating: 4,
		num: -1144,
	},
	tinkatonsworkshop: {
		name: "Tinkaton's Workshop",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (defender.hasType('Steel') && defender.hasType('Flying')) {
				this.debug('Tinkaton\'s Workshop boost');
				return this.chainModify(10);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (defender.hasType('Steel') && defender.hasType('Flying')) {
				this.debug('Tinkaton\'s Workshop boost');
				return this.chainModify(10);
			}
		},
		flags: {},
		rating: 5,
		num: -1145,
	},
	thebestdefense: {
		name: "The Best Defense",
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			const def = pokemon.getStat('def', false, false);
			const halfDef = Math.floor(def / 2);
			return atk + halfDef;
		},
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			const def = pokemon.getStat('def', false, false);
			const halfDef = Math.floor(def / 2);
			return spa + halfDef;
		},
		flags: {},
		rating: 4,
		num: -1146,
	},
	manofwar: {
		name: "Man of War",
		onAfterMoveSecondarySelf(source, target, move) {
			if (move.category === 'Status') return;
			if (!this.checkMoveMakesContact(move, source, target, true)) return;
			
			// Apply Man of War effect on target if not already applied
			if (!target.volatiles['manofwar'] || target.volatiles['manofwar'].source !== source) {
				target.addVolatile('manofwar', source);
			}
		},
		onTryMove(pokemon, target, move) {
			// Prevent Protect if any target has Man of War from this user
			if (move.id === 'protect') {
				for (const foe of pokemon.foes()) {
					if (foe.volatiles['manofwar'] && foe.volatiles['manofwar'].source === pokemon) {
						this.add('-fail', pokemon, 'move: Protect', '[from] ability: Man of War');
						return false;
					}
				}
			}
		},
		flags: {},
		condition: {
			name: 'Man of War',
			onStart(target, source) {
				this.effectState.source = source;
				this.add('-start', target, 'Man of War', `[from] ability: Man of War`, `[of] ${source}`);
			},
			onResidualOrder: 9,
			onResidual(target) {
				if (!this.effectState.source?.isActive || target.fainted) {
					target.removeVolatile('manofwar');
					return;
				}
				
				// Lower both Defense and Special Defense by 1 stage at end of each turn
				this.boost({def: -1, spd: -1}, target, this.effectState.source);
			},
			onSwitchOut(target) {
				target.removeVolatile('manofwar');
			},
			onFaint(target) {
				target.removeVolatile('manofwar');
			},
			onEnd(target) {
				this.add('-end', target, 'Man of War');
			},
		},
		rating: 4,
		num: -1147,
	},
	springlock: {
		name: "Springlock",
		shortDesc: "If raining/statused or would be KO'd transform into Springtrap and clear status + 100% Heal. After transformation/on switch + 1 ATK + 1 Spe if ally fainted.",
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			// Only trigger for Bunnelby-Springtrap that hasn't transformed yet
			if (target.species.id !== 'bunnelbyspringtrap') return;
			if (target.abilityState.hasTransformed) return;
			
			// Check if this damage would KO the target
			if (target.hp - damage <= 0) {
				// Use heal to ensure proper HP display and updates
				this.heal(target.maxhp, target, target);
				
				// Also directly set HP to max to guarantee
				target.hp = target.maxhp;
				
				// Clear any status conditions
				target.clearStatus();
				
				// Then transform
				target.formeChange('Diggersby-Springtrap', this.effect, true);
				
				// Mark as transformed
				target.abilityState.hasTransformed = true;
				
				// Set the ability back to Springlock
				const newAbility = this.dex.abilities.get('springlock');
				target.ability = newAbility.id;
				target.abilityState = {
					id: newAbility.id,
					effectType: 'Ability',
					effect: newAbility,
					source: target,
					sourceEffect: this.effect,
					sourceSlot: target.position,
					target: target,
					hasTransformed: true,
				} as any;
				
				// Trigger ability onStart effects
				this.singleEvent('Start', newAbility, target.abilityState, target);
				
				// Grant stat boost
				this.boost({atk: 1, spe: 1}, target, target, this.effect);
				
				// Force a second heal to ensure display updates
				this.heal(target.maxhp, target, target);
				
				// Show messages
				this.add('-activate', target, 'ability: Springlock');
				this.add('-message', `${target.name} transformed into Diggersby-Springtrap and restored to full health!`);
				
				// Return false to prevent the original damage
				return false;
			}
		},
		onSetStatus(status, pokemon, source, effect) {
			// Only trigger for Bunnelby-Springtrap that hasn't transformed yet
			if (pokemon.species.id !== 'bunnelbyspringtrap') return;
			if (pokemon.abilityState.hasTransformed) return;
			
			if (status) {
				// Heal to full using multiple methods
				this.heal(pokemon.maxhp, pokemon, pokemon);
				pokemon.hp = pokemon.maxhp;
				
				// Clear status
				pokemon.clearStatus();
				
				// Transform
				pokemon.formeChange('Diggersby-Springtrap', this.effect, true);
				
				// Mark as transformed
				pokemon.abilityState.hasTransformed = true;
				
				// Set the ability back
				const newAbility = this.dex.abilities.get('springlock');
				pokemon.ability = newAbility.id;
				pokemon.abilityState = {
					id: newAbility.id,
					effectType: 'Ability',
					effect: newAbility,
					source: pokemon,
					sourceEffect: this.effect,
					sourceSlot: pokemon.position,
					target: pokemon,
					hasTransformed: true,
				} as any;
				
				// Trigger ability onStart
				this.singleEvent('Start', newAbility, pokemon.abilityState, pokemon);
				
				// Grant stat boost
				this.boost({atk: 1, spe: 1}, pokemon, pokemon, this.effect);
				
				// Force second heal
				this.heal(pokemon.maxhp, pokemon, pokemon);
				
				// Show messages
				this.add('-activate', pokemon, 'ability: Springlock');
				this.add('-message', `${pokemon.name} transformed into Diggersby-Springtrap and restored to full health!`);
				
				return false; // Prevent the status
			}
		},
		onWeather(pokemon) {
			// Only trigger for Bunnelby-Springtrap that hasn't transformed yet
			if (pokemon.species.id !== 'bunnelbyspringtrap') return;
			if (pokemon.abilityState.hasTransformed) return;
			
			const weather = pokemon.effectiveWeather();
			if (weather === 'raindance' || weather === 'primordialsea') {
				// Heal to full
				this.heal(pokemon.maxhp, pokemon, pokemon);
				pokemon.hp = pokemon.maxhp;
				
				// Clear status
				pokemon.clearStatus();
				
				// Transform
				pokemon.formeChange('Diggersby-Springtrap', this.effect, true);
				
				// Mark as transformed
				pokemon.abilityState.hasTransformed = true;
				
				// Set the ability back
				const newAbility = this.dex.abilities.get('springlock');
				pokemon.ability = newAbility.id;
				pokemon.abilityState = {
					id: newAbility.id,
					effectType: 'Ability',
					effect: newAbility,
					source: pokemon,
					sourceEffect: this.effect,
					sourceSlot: pokemon.position,
					target: pokemon,
					hasTransformed: true,
				} as any;
				
				// Trigger ability onStart
				this.singleEvent('Start', newAbility, pokemon.abilityState, pokemon);
				
				// Grant stat boost
				this.boost({atk: 1, spe: 1}, pokemon, pokemon, this.effect);
				
				// Force second heal
				this.heal(pokemon.maxhp, pokemon, pokemon);
				
				// Show messages
				this.add('-activate', pokemon, 'ability: Springlock');
				this.add('-message', `${pokemon.name} transformed into Diggersby-Springtrap and restored to full health!`);
			}
		},
		onSwitchIn(pokemon) {
			// Logic for Diggersby-Springtrap - only after transformation
			if (pokemon.species.id === 'diggersbyspringtrap' && !pokemon.abilityState.springlockBoostUsed) {
				// Count how many Pokémon have fainted on the user's side
				const faintedCount = pokemon.side.pokemon.filter(p => p.fainted).length;
				
				if (faintedCount > 0) {
					this.add('-activate', pokemon, 'ability: Springlock');
					this.boost({atk: 1, spe: 1}, pokemon, pokemon, this.effect);
					this.add('-message', `${pokemon.name} gains +1 Attack and +1 Speed from fallen allies!`);
					pokemon.abilityState.springlockBoostUsed = true;
				}
			}
		},
		flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
		rating: 5,
		num: -1148,
	},
	megasol: {
		name: "Mega Sol",
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mega Sol');
		},
		onModifyMove(move, source, target) {
			if (move.id === 'solarbeam' || move.id === 'solarblade') {
				if (move.flags['charge']) {
					delete move.self?.volatileStatus;
					delete move.flags['charge'];
				}
				move.onTryMove = (attacker, defender, move) => {
					if (attacker.removeVolatile(move.id)) return;
					this.add('-prepare', attacker, move.name);
					this.attrLastMove('[still]');
					this.addMove('-anim', attacker, move.name, defender);
				};
			}
			if (move.id === 'growth') {
				move.onHit = function(pokemon) {
					this.boost({atk: 1, spa: 1}, pokemon, pokemon);
				};
			}
		},
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			if (move.id === 'weatherball') {
				move.type = 'Fire';
			}
		},
		onBasePowerPriority: 1,
		onBasePower(basePower, attacker, defender, move) {
			if (move.id === 'weatherball') {
				const weather = attacker.effectiveWeather();
				switch (weather) {
					case 'sunnyday':
					case 'desolateland':
						// Sun boosts Fire 1.5x naturally, just normalize BP to 100
						return this.chainModify(100 / basePower);
					case 'raindance':
					case 'primordialsea':
						// Rain halves Fire damage, compensate to reach 150 effective BP
						return this.chainModify(300 / basePower);
					case 'sandstorm':
					case 'hail':
					case 'snowscape':
						// No weather modifier on Fire, set to 150 effective BP
						return this.chainModify(150 / basePower);
					default:
						// No weather, set to 150 effective BP
						return this.chainModify(150 / basePower);
				}
			}
			if (move.type === 'Fire') {
				return this.chainModify(1.5);
			}
			if (move.type === 'Water') {
				return this.chainModify(0.5);
			}
		},
		onTryHeal(damage, target, source, effect) {
			if (effect?.id === 'synthesis' || effect?.id === 'morningsun' || effect?.id === 'moonlight') {
				return target.maxhp * 0.75;
			}
		},
		onWeather(target, source, effect) {
			if (effect?.id === 'synthesis' || effect?.id === 'morningsun' || effect?.id === 'moonlight') {
				return false;
			}
		},
		flags: {breakable: 1},
		rating: 4.5,
		num: -1150,
	},
	piercingdrill: {
		name: "Piercing Drill",
		onModifyMove(move) {
			if (move.flags['contact'] && move.category !== 'Status') {
				// Remove protect flag so the move bypasses protection (like Unseen Fist)
				delete move.flags['protect'];
			}
		},
		onBasePowerPriority: 22,
		onBasePower(basePower, attacker, defender, move) {
			// If the move had its protect flag removed, it's bypassing protect
			// Check if the target actually had a protection move up
			if (defender.volatiles['protect'] || defender.volatiles['banefulbunker'] ||
				defender.volatiles['kingsshield'] || defender.volatiles['spikyshield'] ||
				defender.volatiles['burningbulwark'] || defender.volatiles['silktrap']) {
				this.debug('Piercing Drill damage reduction');
				return this.chainModify(0.25);
			}
		},
		flags: {},
		rating: 3.5,
		num: -1151,
	},
	spicyspray: {
		name: "Spicy Spray",
		onDamagingHit(damage, target, source, move) {
			if (move.category !== 'Status') {
				source.trySetStatus('brn', target);
			}
		},
		flags: {},
		rating: 3.5,
		num: -1151,
	},
	// End of Custom Abilities
	noability: {
		isNonstandard: "Past",
		flags: {},
		name: "No Ability",
		rating: 0.1,
		num: 0,
	},
	adaptability: {
		onModifySTAB(stab, source, target, move) {
			if (move.forceSTAB || source.hasType(move.type)) {
				if (stab === 2) {
					return 2.25;
				}
				return 2;
			}
		},
		flags: {},
		name: "Adaptability",
		rating: 4,
		num: 91,
	},
	aerilate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Flying';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Aerilate",
		rating: 4,
		num: 184,
	},
	aftermath: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp && this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 4, source, target);
			}
		},
		flags: {},
		name: "Aftermath",
		rating: 2,
		num: 106,
	},
	airlock: {
		onSwitchIn(pokemon) {
			// Air Lock does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			this.add('-ability', pokemon, 'Air Lock');
			((this.effect as any).onStart as (p: Pokemon) => void).call(this, pokemon);
		},
		onStart(pokemon) {
			pokemon.abilityState.ending = false; // Clear the ending flag
			this.eachEvent('WeatherChange', this.effect);
		},
		onEnd(pokemon) {
			pokemon.abilityState.ending = true;
			this.eachEvent('WeatherChange', this.effect);
		},
		suppressWeather: true,
		flags: {},
		name: "Air Lock",
		rating: 1.5,
		num: 76,
	},
	analytic: {
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon) {
			let boosted = true;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (this.queue.willMove(target)) {
					boosted = false;
					break;
				}
			}
			if (boosted) {
				this.debug('Analytic boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Analytic",
		rating: 2.5,
		num: 148,
	},
	angerpoint: {
		onHit(target, source, move) {
			if (!target.hp) return;
			if (move?.effectType === 'Move' && target.getMoveHitData(move).crit) {
				this.boost({ atk: 12 }, target, target);
			}
		},
		flags: {},
		name: "Anger Point",
		rating: 1,
		num: 83,
	},
	angershell: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				!(effect.hasSheerForce && source.hasAbility('sheerforce'))
			) {
				this.effectState.checkedAngerShell = false;
			} else {
				this.effectState.checkedAngerShell = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedAngerShell;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedAngerShell = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({ atk: 1, spa: 1, spe: 1, def: -1, spd: -1 }, target, target);
			}
		},
		flags: {},
		name: "Anger Shell",
		rating: 3,
		num: 271,
	},
	anticipation: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					if (move.category === 'Status') continue;
					const moveType = move.id === 'hiddenpower' ? target.hpType : move.type;
					if (
						this.dex.getImmunity(moveType, pokemon) && this.dex.getEffectiveness(moveType, pokemon) > 0 ||
						move.ohko
					) {
						this.add('-ability', pokemon, 'Anticipation');
						return;
					}
				}
			}
		},
		flags: {},
		name: "Anticipation",
		rating: 0.5,
		num: 107,
	},
	arenatrap: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.isAdjacent(this.effectState.target)) return;
			if (pokemon.isGrounded()) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (pokemon.isGrounded(!pokemon.knownType)) { // Negate immunity if the type is unknown
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Arena Trap",
		rating: 5,
		num: 71,
	},
	armortail: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const armorTailHolder = this.effectState.target;
			if ((source.isAlly(armorTailHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', armorTailHolder, 'ability: Armor Tail', move, `[of] ${target}`);
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Armor Tail",
		rating: 2.5,
		num: 296,
	},
	aromaveil: {
		onAllyTryAddVolatile(status, target, source, effect) {
			if (['attract', 'disable', 'encore', 'healblock', 'taunt', 'torment'].includes(status.id)) {
				if (effect.effectType === 'Move') {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Aroma Veil', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Aroma Veil",
		rating: 2,
		num: 165,
	},
	asoneglastrier: {
		onSwitchInPriority: 1,
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ atk: length }, source, source, this.dex.abilities.get('chillingneigh'));
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "As One (Glastrier)",
		rating: 3.5,
		num: 266,
	},
	asonespectrier: {
		onSwitchInPriority: 1,
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'As One');
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ spa: length }, source, source, this.dex.abilities.get('grimneigh'));
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "As One (Spectrier)",
		rating: 3.5,
		num: 267,
	},
	aurabreak: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Aura Break');
		},
		onAnyTryPrimaryHit(target, source, move) {
			if (target === source || move.category === 'Status') return;
			move.hasAuraBreak = true;
		},
		flags: { breakable: 1 },
		name: "Aura Break",
		rating: 1,
		num: 188,
	},
	baddreams: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose')) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Bad Dreams",
		rating: 1.5,
		num: 123,
	},
	ballfetch: {
		flags: {},
		name: "Ball Fetch",
		rating: 0,
		num: 237,
	},
	battery: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target && move.category === 'Special') {
				this.debug('Battery boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Battery",
		rating: 0,
		num: 217,
	},
	battlearmor: {
		onCriticalHit: false,
		flags: { breakable: 1 },
		name: "Battle Armor",
		rating: 1,
		num: 4,
	},
	battlebond: {
		onSourceAfterFaint(length, target, source, effect) {
			if (source.bondTriggered) return;
			if (effect?.effectType !== 'Move') return;
			if ((source.species.id === 'greninjabond' || source.species.id === 'greninjacreativeink') && source.hp && !source.transformed && source.side.foePokemonLeft()) {
				this.boost({ atk: 1, spa: 1, spe: 1 }, source, source, this.effect);
				this.add('-activate', source, 'ability: Battle Bond');
				source.bondTriggered = true;
			}
		},
		onModifyMovePriority: -1,
		onModifyMove(move, attacker) {
			if (move.id === 'watershuriken' && attacker.species.name === 'Greninja-Ash' &&
				!attacker.transformed) {
				move.multihit = 3;
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Battle Bond",
		rating: 3.5,
		num: 210,
	},
	beadsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Beads of Ruin');
		},
		onAnyModifySpD(spd, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Beads of Ruin')) return;
			if (!move.ruinedSpD?.hasAbility('Beads of Ruin')) move.ruinedSpD = abilityHolder;
			if (move.ruinedSpD !== abilityHolder) return;
			this.debug('Beads of Ruin SpD drop');
			return this.chainModify(0.75);
		},
		flags: {},
		name: "Beads of Ruin",
		rating: 4.5,
		num: 284,
	},
	beastboost: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				const bestStat = source.getBestStat(true, true);
				this.boost({ [bestStat]: length }, source);
			}
		},
		flags: {},
		name: "Beast Boost",
		rating: 3.5,
		num: 224,
	},
	berserk: {
		onDamage(damage, target, source, effect) {
			if (
				effect.effectType === "Move" &&
				!effect.multihit &&
				!(effect.hasSheerForce && source.hasAbility('sheerforce'))
			) {
				this.effectState.checkedBerserk = false;
			} else {
				this.effectState.checkedBerserk = true;
			}
		},
		onTryEatItem(item) {
			const healingItems = [
				'aguavberry', 'enigmaberry', 'figyberry', 'iapapaberry', 'magoberry', 'sitrusberry', 'wikiberry', 'oranberry', 'berryjuice',
			];
			if (healingItems.includes(item.id)) {
				return this.effectState.checkedBerserk;
			}
			return true;
		},
		onAfterMoveSecondary(target, source, move) {
			this.effectState.checkedBerserk = true;
			if (!source || source === target || !target.hp || !move.totalDamage) return;
			const lastAttackedBy = target.getLastAttackedBy();
			if (!lastAttackedBy) return;
			const damage = move.multihit && !move.smartTarget ? move.totalDamage : lastAttackedBy.damage;
			if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
				this.boost({ spa: 1 }, target, target);
			}
		},
		flags: {},
		name: "Berserk",
		rating: 2,
		num: 201,
	},
	bigpecks: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.def && boost.def < 0) {
				delete boost.def;
				if (!(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
					this.add("-fail", target, "unboost", "Defense", "[from] ability: Big Pecks", `[of] ${target}`);
				}
			}
		},
		flags: { breakable: 1 },
		name: "Big Pecks",
		rating: 0.5,
		num: 145,
	},
	blaze: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Blaze boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Blaze",
		rating: 2,
		num: 66,
	},
	bulletproof: {
		onTryHit(pokemon, target, move) {
			if (move.flags['bullet']) {
				this.add('-immune', pokemon, '[from] ability: Bulletproof');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Bulletproof",
		rating: 3,
		num: 171,
	},
	cheekpouch: {
		onEatItem(item, pokemon) {
			this.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
		name: "Cheek Pouch",
		rating: 2,
		num: 167,
	},
	chillingneigh: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ atk: length }, source);
			}
		},
		flags: {},
		name: "Chilling Neigh",
		rating: 3,
		num: 264,
	},
	chlorophyll: {
		onModifySpe(spe, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Chlorophyll",
		rating: 3,
		num: 34,
	},
	clearbody: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Clear Body", `[of] ${target}`);
			}
		},
		flags: { breakable: 1 },
		name: "Clear Body",
		rating: 2,
		num: 29,
	},
	cloudnine: {
		onSwitchIn(pokemon) {
			// Cloud Nine does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			this.add('-ability', pokemon, 'Cloud Nine');
			((this.effect as any).onStart as (p: Pokemon) => void).call(this, pokemon);
		},
		onStart(pokemon) {
			pokemon.abilityState.ending = false; // Clear the ending flag
			this.eachEvent('WeatherChange', this.effect);
		},
		onEnd(pokemon) {
			pokemon.abilityState.ending = true;
			this.eachEvent('WeatherChange', this.effect);
		},
		suppressWeather: true,
		flags: {},
		name: "Cloud Nine",
		rating: 1.5,
		num: 13,
	},
	colorchange: {
		onAfterMoveSecondary(target, source, move) {
			if (!target.hp) return;
			const type = move.type;
			if (
				target.isActive && move.effectType === 'Move' && move.category !== 'Status' &&
				type !== '???' && !target.hasType(type)
			) {
				if (!target.setType(type)) return false;
				this.add('-start', target, 'typechange', type, '[from] ability: Color Change');

				if (target.side.active.length === 2 && target.position === 1) {
					// Curse Glitch
					const action = this.queue.willMove(target);
					if (action && action.move.id === 'curse') {
						action.targetLoc = -1;
					}
				}
			}
		},
		flags: {},
		name: "Color Change",
		rating: 0,
		num: 16,
	},
	comatose: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Comatose');
		},
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Comatose');
			}
			return false;
		},
		// Permanent sleep "status" implemented in the relevant sleep-checking effects
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Comatose",
		rating: 4,
		num: 213,
	},
	commander: {
		onAnySwitchInPriority: -2,
		onAnySwitchIn() {
			((this.effect as any).onUpdate as (p: Pokemon) => void).call(this, this.effectState.target);
		},
		onStart(pokemon) {
			((this.effect as any).onUpdate as (p: Pokemon) => void).call(this, pokemon);
		},
		onUpdate(pokemon) {
			if (this.gameType !== 'doubles') return;
			// don't run between when a Pokemon switches in and the resulting onSwitchIn event
			if (this.queue.peek()?.choice === 'runSwitch') return;

			const ally = pokemon.allies()[0];
			if (pokemon.switchFlag || ally?.switchFlag) return;
			if (!ally || pokemon.baseSpecies.baseSpecies !== 'Tatsugiri' || ally.baseSpecies.baseSpecies !== 'Dondozo') {
				// Handle any edge cases
				if (pokemon.getVolatile('commanding')) pokemon.removeVolatile('commanding');
				return;
			}

			if (!pokemon.getVolatile('commanding')) {
				// If Dondozo already was commanded this fails
				if (ally.getVolatile('commanded')) return;
				// Cancel all actions this turn for pokemon if applicable
				this.queue.cancelAction(pokemon);
				// Add volatiles to both pokemon
				this.add('-activate', pokemon, 'ability: Commander', `[of] ${ally}`);
				pokemon.addVolatile('commanding');
				ally.addVolatile('commanded', pokemon);
				// Continued in conditions.ts in the volatiles
			} else {
				if (!ally.fainted) return;
				pokemon.removeVolatile('commanding');
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
		name: "Commander",
		rating: 0,
		num: 279,
	},
	competitive: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({ spa: 2 }, target, target, null, false, true);
			}
		},
		flags: {},
		name: "Competitive",
		rating: 2.5,
		num: 172,
	},
	compoundeyes: {
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			this.debug('compoundeyes - enhancing accuracy');
			return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Compound Eyes",
		rating: 3,
		num: 14,
	},
	contrary: {
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= -1;
			}
		},
		flags: { breakable: 1 },
		name: "Contrary",
		rating: 4.5,
		num: 126,
	},
	corrosion: {
		// Implemented in sim/pokemon.js:Pokemon#setStatus
		flags: {},
		name: "Corrosion",
		rating: 2.5,
		num: 212,
	},
	costar: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			const ally = pokemon.allies()[0];
			if (!ally) return;

			let i: BoostID;
			for (i in ally.boosts) {
				pokemon.boosts[i] = ally.boosts[i];
			}
			const volatilesToCopy = ['dragoncheer', 'focusenergy', 'gmaxchistrike', 'laserfocus'];
			// we need to be sure to remove all the overlapping crit volatiles before trying to add any
			for (const volatile of volatilesToCopy) pokemon.removeVolatile(volatile);
			for (const volatile of volatilesToCopy) {
				if (ally.volatiles[volatile]) {
					pokemon.addVolatile(volatile);
					if (volatile === 'gmaxchistrike') pokemon.volatiles[volatile].layers = ally.volatiles[volatile].layers;
					if (volatile === 'dragoncheer') pokemon.volatiles[volatile].hasDragonType = ally.volatiles[volatile].hasDragonType;
				}
			}
			this.add('-copyboost', pokemon, ally, '[from] ability: Costar');
		},
		flags: {},
		name: "Costar",
		rating: 0,
		num: 294,
	},
	cottondown: {
		onDamagingHit(damage, target, source, move) {
			let activated = false;
			for (const pokemon of this.getAllActive()) {
				if (pokemon === target || pokemon.fainted) continue;
				if (!activated) {
					this.add('-ability', target, 'Cotton Down');
					activated = true;
				}
				this.boost({ spe: -1 }, pokemon, target, null, true);
			}
		},
		flags: {},
		name: "Cotton Down",
		rating: 2,
		num: 238,
	},
	cudchew: {
		onEatItem(item, pokemon) {
			if (item.isBerry && pokemon.addVolatile('cudchew')) {
				pokemon.volatiles['cudchew'].berry = item;
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['cudchew'];
		},
		condition: {
			noCopy: true,
			duration: 2,
			onRestart() {
				this.effectState.duration = 2;
			},
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onEnd(pokemon) {
				if (pokemon.hp) {
					const item = this.effectState.berry;
					this.add('-activate', pokemon, 'ability: Cud Chew');
					this.add('-enditem', pokemon, item.name, '[eat]');
					if (this.singleEvent('Eat', item, null, pokemon, null, null)) {
						this.runEvent('EatItem', pokemon, null, null, item);
					}
					if (item.onEat) pokemon.ateBerry = true;
				}
			},
		},
		flags: {},
		name: "Cud Chew",
		rating: 2,
		num: 291,
	},
	curiousmedicine: {
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				ally.clearBoosts();
				this.add('-clearboost', ally, '[from] ability: Curious Medicine', `[of] ${pokemon}`);
			}
		},
		flags: {},
		name: "Curious Medicine",
		rating: 0,
		num: 261,
	},
	cursedbody: {
		onDamagingHit(damage, target, source, move) {
			if (source.volatiles['disable']) return;
			if (!move.isMax && !move.flags['futuremove'] && move.id !== 'struggle') {
				if (this.randomChance(3, 10)) {
					source.addVolatile('disable', this.effectState.target);
				}
			}
		},
		flags: {},
		name: "Cursed Body",
		rating: 2,
		num: 130,
	},
	cutecharm: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.addVolatile('attract', this.effectState.target);
				}
			}
		},
		flags: {},
		name: "Cute Charm",
		rating: 0.5,
		num: 56,
	},
	damp: {
		onAnyTryMove(target, source, effect) {
			if (['explosion', 'mindblown', 'mistyexplosion', 'selfdestruct'].includes(effect.id)) {
				this.attrLastMove('[still]');
				this.add('cant', this.effectState.target, 'ability: Damp', effect, `[of] ${target}`);
				return false;
			}
		},
		onAnyDamage(damage, target, source, effect) {
			if (effect && effect.name === 'Aftermath') {
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Damp",
		rating: 0.5,
		num: 6,
	},
	dancer: {
		flags: {},
		name: "Dancer",
		// implemented in runMove in scripts.js
		rating: 1.5,
		num: 216,
	},
	darkaura: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Dark Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Dark') return;
			if (!move.auraBooster?.hasAbility('Dark Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		flags: {},
		name: "Dark Aura",
		rating: 3,
		num: 186,
	},
	dauntlessshield: {
		onStart(pokemon) {
			if (pokemon.shieldBoost) return;
			pokemon.shieldBoost = true;
			this.boost({ def: 1 }, pokemon);
		},
		flags: {},
		name: "Dauntless Shield",
		rating: 3.5,
		num: 235,
	},
	dazzling: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Dazzling', move, `[of] ${target}`);
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Dazzling",
		rating: 2.5,
		num: 219,
	},
	defeatist: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, pokemon) {
			if (pokemon.hp <= pokemon.maxhp / 2) {
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Defeatist",
		rating: -1,
		num: 129,
	},
	defiant: {
		onAfterEachBoost(boost, target, source, effect) {
			if (!source || target.isAlly(source)) {
				return;
			}
			let statsLowered = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					statsLowered = true;
				}
			}
			if (statsLowered) {
				this.boost({ atk: 2 }, target, target, null, false, true);
			}
		},
		flags: {},
		name: "Defiant",
		rating: 3,
		num: 128,
	},
	deltastream: {
		onStart(source) {
			this.field.setWeather('deltastream');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'deltastream' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('deltastream')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		flags: {},
		name: "Delta Stream",
		rating: 4,
		num: 191,
	},
	desolateland: {
		onStart(source) {
			this.field.setWeather('desolateland');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'desolateland' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('desolateland')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		flags: {},
		name: "Desolate Land",
		rating: 4.5,
		num: 190,
	},
	disguise: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && ['mimikyu', 'mimikyutotem'].includes(target.species.id)) {
				this.add('-activate', target, 'ability: Disguise');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, source, move) {
			if (!target) return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id)) {
				return;
			}
			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target || move.category === 'Status') return;
			if (!['mimikyu', 'mimikyutotem'].includes(target.species.id)) {
				return;
			}

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (['mimikyu', 'mimikyutotem'].includes(pokemon.species.id) && this.effectState.busted) {
				const speciesid = pokemon.species.id === 'mimikyutotem' ? 'Mimikyu-Busted-Totem' : 'Mimikyu-Busted';
				pokemon.formeChange(speciesid, this.effect, true);
				this.damage(pokemon.baseMaxhp / 8, pokemon, pokemon, this.dex.species.get(speciesid));
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Disguise",
		rating: 3.5,
		num: 209,
	},
	download: {
		onStart(pokemon) {
			let totaldef = 0;
			let totalspd = 0;
			for (const target of pokemon.foes()) {
				totaldef += target.getStat('def', false, true);
				totalspd += target.getStat('spd', false, true);
			}
			if (totaldef && totaldef >= totalspd) {
				this.boost({ spa: 1 });
			} else if (totalspd) {
				this.boost({ atk: 1 });
			}
		},
		flags: {},
		name: "Download",
		rating: 3.5,
		num: 88,
	},
	dragonsmaw: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\'s Maw boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Dragon') {
				this.debug('Dragon\'s Maw boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Dragon's Maw",
		rating: 3.5,
		num: 263,
	},
	drizzle: {
		onStart(source) {
			if (source.species.id === 'kyogre' && source.item === 'blueorb') return;
			this.field.setWeather('raindance');
		},
		flags: {},
		name: "Drizzle",
		rating: 4,
		num: 2,
	},
	drought: {
		onStart(source) {
			if (source.species.id === 'groudon' && source.item === 'redorb') return;
			this.field.setWeather('sunnyday');
		},
		flags: {},
		name: "Drought",
		rating: 4,
		num: 70,
	},
	dryskin: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Dry Skin');
				}
				return null;
			}
		},
		onSourceBasePowerPriority: 17,
		onSourceBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(1.25);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 8);
			} else if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: { breakable: 1 },
		name: "Dry Skin",
		rating: 3,
		num: 87,
	},
	earlybird: {
		flags: {},
		name: "Early Bird",
		// Implemented in statuses.js
		rating: 1.5,
		num: 48,
	},
	eartheater: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Ground') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Earth Eater');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Earth Eater",
		rating: 3.5,
		num: 297,
	},
	effectspore: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target) && !source.status && source.runStatusImmunity('powder')) {
				const r = this.random(100);
				if (r < 11) {
					source.setStatus('slp', target);
				} else if (r < 21) {
					source.setStatus('par', target);
				} else if (r < 30) {
					source.setStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Effect Spore",
		rating: 2,
		num: 27,
	},
	electricsurge: {
		onStart(source) {
			this.field.setTerrain('electricterrain');
		},
		flags: {},
		name: "Electric Surge",
		rating: 4,
		num: 226,
	},
	electromorphosis: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			target.addVolatile('charge');
		},
		flags: {},
		name: "Electromorphosis",
		rating: 3,
		num: 280,
	},
	embodyaspectcornerstone: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Cornerstone-Tera' && pokemon.terastallized &&
				this.effectState.embodied !== pokemon.previouslySwitchedIn) {
				this.effectState.embodied = pokemon.previouslySwitchedIn;
				this.boost({ def: 1 }, pokemon);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Embody Aspect (Cornerstone)",
		rating: 3.5,
		num: 304,
	},
	embodyaspecthearthflame: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Hearthflame-Tera' && pokemon.terastallized &&
				this.effectState.embodied !== pokemon.previouslySwitchedIn) {
				this.effectState.embodied = pokemon.previouslySwitchedIn;
				this.boost({ atk: 1 }, pokemon);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Embody Aspect (Hearthflame)",
		rating: 3.5,
		num: 303,
	},
	embodyaspectteal: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Teal-Tera' && pokemon.terastallized &&
				this.effectState.embodied !== pokemon.previouslySwitchedIn) {
				this.effectState.embodied = pokemon.previouslySwitchedIn;
				this.boost({ spe: 1 }, pokemon);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Embody Aspect (Teal)",
		rating: 3.5,
		num: 301,
	},
	embodyaspectwellspring: {
		onStart(pokemon) {
			if (pokemon.baseSpecies.name === 'Ogerpon-Wellspring-Tera' && pokemon.terastallized &&
				this.effectState.embodied !== pokemon.previouslySwitchedIn) {
				this.effectState.embodied = pokemon.previouslySwitchedIn;
				this.boost({ spd: 1 }, pokemon);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Embody Aspect (Wellspring)",
		rating: 3.5,
		num: 302,
	},
	emergencyexit: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Emergency Exit');
		},
		flags: {},
		name: "Emergency Exit",
		rating: 1,
		num: 194,
	},
	fairyaura: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Fairy Aura');
		},
		onAnyBasePowerPriority: 20,
		onAnyBasePower(basePower, source, target, move) {
			if (target === source || move.category === 'Status' || move.type !== 'Fairy') return;
			if (!move.auraBooster?.hasAbility('Fairy Aura')) move.auraBooster = this.effectState.target;
			if (move.auraBooster !== this.effectState.target) return;
			return this.chainModify([move.hasAuraBreak ? 3072 : 5448, 4096]);
		},
		flags: {},
		name: "Fairy Aura",
		rating: 3,
		num: 187,
	},
	filter: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Filter neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: { breakable: 1 },
		name: "Filter",
		rating: 3,
		num: 111,
	},
	flamebody: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('brn', target);
				}
			}
		},
		flags: {},
		name: "Flame Body",
		rating: 2,
		num: 49,
	},
	flareboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.status === 'brn' && move.category === 'Special') {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Flare Boost",
		rating: 2,
		num: 138,
	},
	flashfire: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				move.accuracy = true;
				if (!target.addVolatile('flashfire')) {
					this.add('-immune', target, '[from] ability: Flash Fire');
				}
				return null;
			}
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('flashfire');
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(target) {
				this.add('-start', target, 'ability: Flash Fire');
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('flashfire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onModifySpAPriority: 5,
			onModifySpA(atk, attacker, defender, move) {
				if (move.type === 'Fire' && attacker.hasAbility('flashfire')) {
					this.debug('Flash Fire boost');
					return this.chainModify(1.5);
				}
			},
			onEnd(target) {
				this.add('-end', target, 'ability: Flash Fire', '[silent]');
			},
		},
		flags: { breakable: 1 },
		name: "Flash Fire",
		rating: 3.5,
		num: 18,
	},
	flowergift: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== 'Cherrim' || pokemon.transformed) return;
			if (!pokemon.hp) return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				if (pokemon.species.id !== 'cherrimsunshine') {
					pokemon.formeChange('Cherrim-Sunshine', this.effect, false, '0', '[msg]');
				}
			} else {
				if (pokemon.species.id === 'cherrimsunshine') {
					pokemon.formeChange('Cherrim', this.effect, false, '0', '[msg]');
				}
			}
		},
		onAllyModifyAtkPriority: 3,
		onAllyModifyAtk(atk, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onAllyModifySpDPriority: 4,
		onAllyModifySpD(spd, pokemon) {
			if (this.effectState.target.baseSpecies.baseSpecies !== 'Cherrim') return;
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1 },
		name: "Flower Gift",
		rating: 1,
		num: 122,
	},
	flowerveil: {
		onAllyTryBoost(boost, target, source, effect) {
			if ((source && target === source) || !target.hasType('Grass')) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Flower Veil', `[of] ${effectHolder}`);
			}
		},
		onAllySetStatus(status, target, source, effect) {
			if (target.hasType('Grass') && source && target !== source && effect && effect.id !== 'yawn') {
				this.debug('interrupting setStatus with Flower Veil');
				if (effect.name === 'Synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
					const effectHolder = this.effectState.target;
					this.add('-block', target, 'ability: Flower Veil', `[of] ${effectHolder}`);
				}
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (target.hasType('Grass') && status.id === 'yawn') {
				this.debug('Flower Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Flower Veil', `[of] ${effectHolder}`);
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Flower Veil",
		rating: 0,
		num: 166,
	},
	fluffy: {
		onSourceModifyDamage(damage, source, target, move) {
			let mod = 1;
			if (move.type === 'Fire') mod *= 2;
			if (move.flags['contact']) mod /= 2;
			return this.chainModify(mod);
		},
		flags: { breakable: 1 },
		name: "Fluffy",
		rating: 3.5,
		num: 218,
	},
	forecast: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Castform' || pokemon.transformed) return;
			let forme = null;
			switch (pokemon.effectiveWeather()) {
				case 'sunnyday':
				case 'desolateland':
					if (pokemon.species.id !== 'castformsunny') forme = 'Castform-Sunny';
					break;
				case 'raindance':
				case 'primordialsea':
					if (pokemon.species.id !== 'castformrainy') forme = 'Castform-Rainy';
					break;
				case 'hail':
				case 'snowscape':
					if (pokemon.species.id !== 'castformsnowy') forme = 'Castform-Snowy';
					break;
				default:
					if (pokemon.species.id !== 'castform') forme = 'Castform';
					break;
			}
			if (pokemon.isActive && forme) {
				pokemon.formeChange(forme, this.effect, false, '0', '[msg]');
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
		name: "Forecast",
		rating: 2,
		num: 59,
	},
	forewarn: {
		onStart(pokemon) {
			let warnMoves: (Move | Pokemon)[][] = [];
			let warnBp = 1;
			for (const target of pokemon.foes()) {
				for (const moveSlot of target.moveSlots) {
					const move = this.dex.moves.get(moveSlot.move);
					let bp = move.basePower;
					if (move.ohko) bp = 150;
					if (move.id === 'counter' || move.id === 'metalburst' || move.id === 'mirrorcoat') bp = 120;
					if (bp === 1) bp = 80;
					if (!bp && move.category !== 'Status') bp = 80;
					if (bp > warnBp) {
						warnMoves = [[move, target]];
						warnBp = bp;
					} else if (bp === warnBp) {
						warnMoves.push([move, target]);
					}
				}
			}
			if (!warnMoves.length) return;
			const [warnMoveName, warnTarget] = this.sample(warnMoves);
			this.add('-activate', pokemon, 'ability: Forewarn', warnMoveName, `[of] ${warnTarget}`);
		},
		flags: {},
		name: "Forewarn",
		rating: 0.5,
		num: 108,
	},
	friendguard: {
		onAnyModifyDamage(damage, source, target, move) {
			if (target !== this.effectState.target && target.isAlly(this.effectState.target)) {
				this.debug('Friend Guard weaken');
				return this.chainModify(0.75);
			}
		},
		flags: { breakable: 1 },
		name: "Friend Guard",
		rating: 0,
		num: 132,
	},
	frisk: {
		onStart(pokemon) {
			for (const target of pokemon.foes()) {
				if (target.item) {
					this.add('-item', target, target.getItem().name, '[from] ability: Frisk', `[of] ${pokemon}`);
				}
			}
		},
		flags: {},
		name: "Frisk",
		rating: 1.5,
		num: 119,
	},
	fullmetalbody: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: Full Metal Body", `[of] ${target}`);
			}
		},
		flags: {},
		name: "Full Metal Body",
		rating: 2,
		num: 230,
	},
	furcoat: {
		onModifyDefPriority: 6,
		onModifyDef(def) {
			return this.chainModify(2);
		},
		flags: { breakable: 1 },
		name: "Fur Coat",
		rating: 4,
		num: 169,
	},
	galewings: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.type === 'Flying' && pokemon.hp === pokemon.maxhp) return priority + 1;
		},
		flags: {},
		name: "Gale Wings",
		rating: 1.5,
		num: 177,
	},
	galvanize: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Electric';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Galvanize",
		rating: 4,
		num: 206,
	},
	gluttony: {
		onStart(pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		onDamage(item, pokemon) {
			pokemon.abilityState.gluttony = true;
		},
		flags: {},
		name: "Gluttony",
		rating: 1.5,
		num: 82,
	},
	goodasgold: {
		onTryHit(target, source, move) {
			if (move.category === 'Status' && target !== source) {
				this.add('-immune', target, '[from] ability: Good as Gold');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Good as Gold",
		rating: 5,
		num: 283,
	},
	gooey: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Gooey');
				this.boost({ spe: -1 }, source, target, null, true);
			}
		},
		flags: {},
		name: "Gooey",
		rating: 2,
		num: 183,
	},
	gorillatactics: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Gorilla Tactics");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifyAtkPriority: 1,
		onModifyAtk(atk, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Gorilla Tactics Atk Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		flags: {},
		name: "Gorilla Tactics",
		rating: 4.5,
		num: 255,
	},
	grasspelt: {
		onModifyDefPriority: 6,
		onModifyDef(pokemon) {
			if (this.field.isTerrain('grassyterrain')) return this.chainModify(1.5);
		},
		flags: { breakable: 1 },
		name: "Grass Pelt",
		rating: 0.5,
		num: 179,
	},
	grassysurge: {
		onStart(source) {
			this.field.setTerrain('grassyterrain');
		},
		flags: {},
		name: "Grassy Surge",
		rating: 4,
		num: 229,
	},
	grimneigh: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ spa: length }, source);
			}
		},
		flags: {},
		name: "Grim Neigh",
		rating: 3,
		num: 265,
	},
	guarddog: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Guard Dog');
			return null;
		},
		onTryBoostPriority: 2,
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.boost({ atk: 1 }, target, target, null, false, true);
			}
		},
		flags: { breakable: 1 },
		name: "Guard Dog",
		rating: 2,
		num: 275,
	},
	gulpmissile: {
		onDamagingHit(damage, target, source, move) {
			if (!source.hp || !source.isActive || target.isSemiInvulnerable()) return;
			if (['cramorantgulping', 'cramorantgorging'].includes(target.species.id)) {
				this.damage(source.baseMaxhp / 4, source, target);
				if (target.species.id === 'cramorantgulping') {
					this.boost({ def: -1 }, source, target, null, true);
				} else {
					source.trySetStatus('par', target, move);
				}
				target.formeChange('cramorant', move);
			}
		},
		// The Dive part of this mechanic is implemented in Dive's `onTryMove` in moves.ts
		onSourceTryPrimaryHit(target, source, effect) {
			if (effect?.id === 'surf' && source.hasAbility('gulpmissile') && source.species.name === 'Cramorant') {
				const forme = source.hp <= source.maxhp / 2 ? 'cramorantgorging' : 'cramorantgulping';
				source.formeChange(forme, effect);
			}
		},
		flags: { cantsuppress: 1, notransform: 1 },
		name: "Gulp Missile",
		rating: 2.5,
		num: 241,
	},
	guts: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Guts",
		rating: 3.5,
		num: 62,
	},
	hadronengine: {
		onStart(pokemon) {
			if (!this.field.setTerrain('electricterrain') && this.field.isTerrain('electricterrain')) {
				this.add('-activate', pokemon, 'ability: Hadron Engine');
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (this.field.isTerrain('electricterrain')) {
				this.debug('Hadron Engine boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Hadron Engine",
		rating: 4.5,
		num: 289,
	},
	harvest: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (this.field.isWeather(['sunnyday', 'desolateland']) || this.randomChance(1, 2)) {
				if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
					pokemon.setItem(pokemon.lastItem);
					pokemon.lastItem = '';
					this.add('-item', pokemon, pokemon.getItem(), '[from] ability: Harvest');
				}
			}
		},
		flags: {},
		name: "Harvest",
		rating: 2.5,
		num: 139,
	},
	healer: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			for (const allyActive of pokemon.adjacentAllies()) {
				if (allyActive.status && this.randomChance(3, 10)) {
					this.add('-activate', pokemon, 'ability: Healer');
					allyActive.cureStatus();
				}
			}
		},
		flags: {},
		name: "Healer",
		rating: 0,
		num: 131,
	},
	heatproof: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Heatproof Atk weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				this.debug('Heatproof SpA weaken');
				return this.chainModify(0.5);
			}
		},
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'brn') {
				return damage / 2;
			}
		},
		flags: { breakable: 1 },
		name: "Heatproof",
		rating: 2,
		num: 85,
	},
	heavymetal: {
		onModifyWeightPriority: 1,
		onModifyWeight(weighthg) {
			return weighthg * 2;
		},
		flags: { breakable: 1 },
		name: "Heavy Metal",
		rating: 0,
		num: 134,
	},
	honeygather: {
		flags: {},
		name: "Honey Gather",
		rating: 0,
		num: 118,
	},
	hospitality: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			for (const ally of pokemon.adjacentAllies()) {
				this.heal(ally.baseMaxhp / 4, ally, pokemon);
			}
		},
		flags: {},
		name: "Hospitality",
		rating: 0,
		num: 299,
	},
	hugepower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Huge Power",
		rating: 5,
		num: 37,
	},
	hungerswitch: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.species.baseSpecies !== 'Morpeko' || pokemon.terastallized) return;
			const targetForme = pokemon.species.name === 'Morpeko' ? 'Morpeko-Hangry' : 'Morpeko';
			pokemon.formeChange(targetForme);
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Hunger Switch",
		rating: 1,
		num: 258,
	},
	hustle: {
		// This should be applied directly to the stat as opposed to chaining with the others
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.modify(atk, 1.5);
		},
		onSourceModifyAccuracyPriority: -1,
		onSourceModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Physical' && typeof accuracy === 'number') {
				return this.chainModify([3277, 4096]);
			}
		},
		flags: {},
		name: "Hustle",
		rating: 3.5,
		num: 55,
	},
	hydration: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.status && ['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				this.debug('hydration');
				this.add('-activate', pokemon, 'ability: Hydration');
				pokemon.cureStatus();
			}
		},
		flags: {},
		name: "Hydration",
		rating: 1.5,
		num: 93,
	},
	hypercutter: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.atk && boost.atk < 0) {
				delete boost.atk;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "Attack", "[from] ability: Hyper Cutter", `[of] ${target}`);
				}
			}
		},
		flags: { breakable: 1 },
		name: "Hyper Cutter",
		rating: 1.5,
		num: 52,
	},
	icebody: {
		onWeather(target, source, effect) {
			if (effect.id === 'hail' || effect.id === 'snowscape') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		flags: {},
		name: "Ice Body",
		rating: 1,
		num: 115,
	},
	iceface: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			if (this.field.isWeather(['hail', 'snowscape']) && pokemon.species.id === 'eiscuenoice') {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect?.effectType === 'Move' && effect.category === 'Physical' && target.species.id === 'eiscue') {
				this.add('-activate', target, 'ability: Ice Face');
				this.effectState.busted = true;
				return 0;
			}
		},
		onCriticalHit(target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue') return;
			if (target.volatiles['substitute'] && !(move.flags['bypasssub'] || move.infiltrates)) return;
			if (!target.runImmunity(move)) return;
			return false;
		},
		onEffectiveness(typeMod, target, type, move) {
			if (!target) return;
			if (move.category !== 'Physical' || target.species.id !== 'eiscue') return;

			const hitSub = target.volatiles['substitute'] && !move.flags['bypasssub'] && !(move.infiltrates && this.gen >= 6);
			if (hitSub) return;

			if (!target.runImmunity(move)) return;
			return 0;
		},
		onUpdate(pokemon) {
			if (pokemon.species.id === 'eiscue' && this.effectState.busted) {
				pokemon.formeChange('Eiscue-Noice', this.effect, true);
			}
		},
		onWeatherChange(pokemon, source, sourceEffect) {
			// snow/hail resuming because Cloud Nine/Air Lock ended does not trigger Ice Face
			if ((sourceEffect as Ability)?.suppressWeather) return;
			if (!pokemon.hp) return;
			if (this.field.isWeather(['hail', 'snowscape']) && pokemon.species.id === 'eiscuenoice') {
				this.add('-activate', pokemon, 'ability: Ice Face');
				this.effectState.busted = false;
				pokemon.formeChange('Eiscue', this.effect, true);
			}
		},
		flags: {
			failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1,
			breakable: 1, notransform: 1,
		},
		name: "Ice Face",
		rating: 3,
		num: 248,
	},
	icescales: {
		onSourceModifyDamage(damage, source, target, move) {
			if (move.category === 'Special') {
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Ice Scales",
		rating: 4,
		num: 246,
	},
	illuminate: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Illuminate", `[of] ${target}`);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: { breakable: 1 },
		name: "Illuminate",
		rating: 0.5,
		num: 35,
	},
	illusion: {
		onBeforeSwitchIn(pokemon) {
			pokemon.illusion = null;
			// yes, you can Illusion an active pokemon but only if it's to your right
			for (let i = pokemon.side.pokemon.length - 1; i > pokemon.position; i--) {
				const possibleTarget = pokemon.side.pokemon[i];
				if (!possibleTarget.fainted) {
					// If Ogerpon is in the last slot while the Illusion Pokemon is Terastallized
					// Illusion will not disguise as anything
					if (!pokemon.terastallized || !['Ogerpon', 'Terapagos'].includes(possibleTarget.species.baseSpecies)) {
						pokemon.illusion = possibleTarget;
					}
					break;
				}
			}
		},
		onDamagingHit(damage, target, source, move) {
			if (target.illusion) {
				this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, source, move);
			}
		},
		onEnd(pokemon) {
			if (pokemon.illusion) {
				this.debug('illusion cleared');
				pokemon.illusion = null;
				const details = pokemon.getUpdatedDetails();
				this.add('replace', pokemon, details);
				this.add('-end', pokemon, 'Illusion');
				if (this.ruleTable.has('illusionlevelmod')) {
					this.hint("Illusion Level Mod is active, so this Pok\u00e9mon's true level was hidden.", true);
				}
			}
		},
		onFaint(pokemon) {
			pokemon.illusion = null;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
		name: "Illusion",
		rating: 4.5,
		num: 149,
	},
	immunity: {
		onUpdate(pokemon) {
			if (pokemon.status === 'psn' || pokemon.status === 'tox') {
				this.add('-activate', pokemon, 'ability: Immunity');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'psn' && status.id !== 'tox') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Immunity');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Immunity",
		rating: 2,
		num: 17,
	},
	imposter: {
		onSwitchIn(pokemon) {
			// Imposter does not activate when Skill Swapped or when Neutralizing Gas leaves the field
			// Imposter copies across in doubles/triples
			// (also copies across in multibattle and diagonally in free-for-all,
			// but side.foe already takes care of those)
			const target = pokemon.side.foe.active[pokemon.side.foe.active.length - 1 - pokemon.position];
			if (target) {
				pokemon.transformInto(target, this.dex.abilities.get('imposter'));
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
		name: "Imposter",
		rating: 5,
		num: 150,
	},
	infiltrator: {
		onModifyMove(move) {
			move.infiltrates = true;
		},
		flags: {},
		name: "Infiltrator",
		rating: 2.5,
		num: 151,
	},
	innardsout: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (!target.hp) {
				this.damage(target.getUndynamaxedHP(damage), source, target);
			}
		},
		flags: {},
		name: "Innards Out",
		rating: 4,
		num: 215,
	},
	innerfocus: {
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'flinch') return null;
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Inner Focus', `[of] ${target}`);
			}
		},
		flags: { breakable: 1 },
		name: "Inner Focus",
		rating: 1,
		num: 39,
	},
	insomnia: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Insomnia');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Insomnia');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Insomnia');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Insomnia",
		rating: 1.5,
		num: 15,
	},
	intimidate: {
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ atk: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Intimidate",
		rating: 3.5,
		num: 22,
	},
	intrepidsword: {
		onStart(pokemon) {
			if (pokemon.swordBoost) return;
			pokemon.swordBoost = true;
			this.boost({ atk: 1 }, pokemon);
		},
		flags: {},
		name: "Intrepid Sword",
		rating: 4,
		num: 234,
	},
	ironbarbs: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Iron Barbs",
		rating: 2.5,
		num: 160,
	},
	ironfist: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Iron Fist boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Iron Fist",
		rating: 3,
		num: 89,
	},
	justified: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Dark') {
				this.boost({ atk: 1 });
			}
		},
		flags: {},
		name: "Justified",
		rating: 2.5,
		num: 154,
	},
	keeneye: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Keen Eye", `[of] ${target}`);
				}
			}
		},
		onModifyMove(move) {
			move.ignoreEvasion = true;
		},
		flags: { breakable: 1 },
		name: "Keen Eye",
		rating: 0.5,
		num: 51,
	},
	klutz: {
		// Klutz isn't technically active immediately in-game, but it activates early enough to beat all items
		// we should keep an eye out in future gens for items that activate on switch-in before Unnerve
		onSwitchInPriority: 1,
		// Item suppression implemented in Pokemon.ignoringItem() within sim/pokemon.js
		onStart(pokemon) {
			this.singleEvent('End', pokemon.getItem(), pokemon.itemState, pokemon);
		},
		flags: {},
		name: "Klutz",
		rating: -1,
		num: 103,
	},
	leafguard: {
		onSetStatus(status, target, source, effect) {
			if (['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				if ((effect as Move)?.status) {
					this.add('-immune', target, '[from] ability: Leaf Guard');
				}
				return false;
			}
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn' && ['sunnyday', 'desolateland'].includes(target.effectiveWeather())) {
				this.add('-immune', target, '[from] ability: Leaf Guard');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Leaf Guard",
		rating: 0.5,
		num: 102,
	},
	levitate: {
		// airborneness implemented in sim/pokemon.js:Pokemon#isGrounded
		flags: { breakable: 1 },
		name: "Levitate",
		rating: 3.5,
		num: 26,
	},
	libero: {
		onPrepareHit(source, target, move) {
			if (this.effectState.libero === source.previouslySwitchedIn) return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.libero = source.previouslySwitchedIn;
				this.add('-start', source, 'typechange', type, '[from] ability: Libero');
			}
		},
		flags: {},
		name: "Libero",
		rating: 4,
		num: 236,
	},
	lightmetal: {
		onModifyWeight(weighthg) {
			return this.trunc(weighthg / 2);
		},
		flags: { breakable: 1 },
		name: "Light Metal",
		rating: 1,
		num: 135,
	},
	lightningrod: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Lightning Rod');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Electric' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Lightning Rod');
				}
				return this.effectState.target;
			}
		},
		flags: { breakable: 1 },
		name: "Lightning Rod",
		rating: 3,
		num: 31,
	},
	limber: {
		onUpdate(pokemon) {
			if (pokemon.status === 'par') {
				this.add('-activate', pokemon, 'ability: Limber');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'par') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Limber');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Limber",
		rating: 2,
		num: 7,
	},
	lingeringaroma: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'lingeringaroma') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('lingeringaroma', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Lingering Aroma', this.dex.abilities.get(oldAbility).name, `[of] ${source}`);
				}
			}
		},
		flags: {},
		name: "Lingering Aroma",
		rating: 2,
		num: 268,
	},
	liquidooze: {
		onSourceTryHeal(damage, target, source, effect) {
			this.debug(`Heal is occurring: ${target} <- ${source} :: ${effect.id}`);
			const canOoze = ['drain', 'leechseed', 'strengthsap'];
			if (canOoze.includes(effect.id)) {
				this.damage(damage);
				return 0;
			}
		},
		flags: {},
		name: "Liquid Ooze",
		rating: 2.5,
		num: 64,
	},
	liquidvoice: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if (move.flags['sound'] && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
			}
		},
		flags: {},
		name: "Liquid Voice",
		rating: 1.5,
		num: 204,
	},
	longreach: {
		onModifyMove(move) {
			delete move.flags['contact'];
		},
		flags: {},
		name: "Long Reach",
		rating: 1,
		num: 203,
	},
	magicbounce: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || move.hasBounced || !move.flags['reflectable'] || target.isSemiInvulnerable()) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, { target: source });
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable'] || target.isSemiInvulnerable()) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, { target: source });
			move.hasBounced = true; // only bounce once in free-for-all battles
			return null;
		},
		flags: { breakable: 1 },
		name: "Magic Bounce",
		rating: 4,
		num: 156,
	},
	magicguard: {
		onDamage(damage, target, source, effect) {
			if (effect.effectType !== 'Move') {
				if (effect.effectType === 'Ability') this.add('-activate', source, 'ability: ' + effect.name);
				return false;
			}
		},
		flags: {},
		name: "Magic Guard",
		rating: 4,
		num: 98,
	},
	magician: {
		onAfterMoveSecondarySelf(source, target, move) {
			if (!move || source.switchFlag === true || !move.hitTargets || source.item || source.volatiles['gem'] ||
				move.id === 'fling' || move.category === 'Status') return;
			const hitTargets = move.hitTargets;
			this.speedSort(hitTargets);
			for (const pokemon of hitTargets) {
				if (pokemon !== source) {
					const yourItem = pokemon.takeItem(source);
					if (!yourItem) continue;
					if (!source.setItem(yourItem)) {
						pokemon.item = yourItem.id; // bypass setItem so we don't break choicelock or anything
						continue;
					}
					this.add('-item', source, yourItem, '[from] ability: Magician', `[of] ${pokemon}`);
					return;
				}
			}
		},
		flags: {},
		name: "Magician",
		rating: 1,
		num: 170,
	},
	magmaarmor: {
		onUpdate(pokemon) {
			if (pokemon.status === 'frz') {
				this.add('-activate', pokemon, 'ability: Magma Armor');
				pokemon.cureStatus();
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'frz') return false;
		},
		flags: { breakable: 1 },
		name: "Magma Armor",
		rating: 0.5,
		num: 40,
	},
	magnetpull: {
		onFoeTrapPokemon(pokemon) {
			if (pokemon.hasType('Steel') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.knownType || pokemon.hasType('Steel')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Magnet Pull",
		rating: 4,
		num: 42,
	},
	marvelscale: {
		onModifyDefPriority: 6,
		onModifyDef(def, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: { breakable: 1 },
		name: "Marvel Scale",
		rating: 2.5,
		num: 63,
	},
	megalauncher: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['pulse']) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Mega Launcher",
		rating: 3,
		num: 178,
	},
	merciless: {
		onModifyCritRatio(critRatio, source, target) {
			if (target && ['psn', 'tox'].includes(target.status)) return 5;
		},
		flags: {},
		name: "Merciless",
		rating: 1.5,
		num: 196,
	},
	mimicry: {
		onSwitchInPriority: -1,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			let types;
			switch (this.field.terrain) {
				case 'electricterrain':
					types = ['Electric'];
					break;
				case 'grassyterrain':
					types = ['Grass'];
					break;
				case 'mistyterrain':
					types = ['Fairy'];
					break;
				case 'psychicterrain':
					types = ['Psychic'];
					break;
				default:
					types = pokemon.baseSpecies.types;
			}
			const oldTypes = pokemon.getTypes();
			if (oldTypes.join() === types.join() || !pokemon.setType(types)) return;
			if (this.field.terrain || pokemon.transformed) {
				this.add('-start', pokemon, 'typechange', types.join('/'), '[from] ability: Mimicry');
				if (!this.field.terrain) this.hint("Transform Mimicry changes you to your original un-transformed types.");
			} else {
				this.add('-activate', pokemon, 'ability: Mimicry');
				this.add('-end', pokemon, 'typechange', '[silent]');
			}
		},
		flags: {},
		name: "Mimicry",
		rating: 0,
		num: 250,
	},
	mindseye: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			if (boost.accuracy && boost.accuracy < 0) {
				delete boost.accuracy;
				if (!(effect as ActiveMove).secondaries) {
					this.add("-fail", target, "unboost", "accuracy", "[from] ability: Mind's Eye", `[of] ${target}`);
				}
			}
		},
		onModifyMovePriority: -5,
		onModifyMove(move) {
			move.ignoreEvasion = true;
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		flags: { breakable: 1 },
		name: "Mind's Eye",
		rating: 0,
		num: 300,
	},
	minus: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Minus",
		rating: 0,
		num: 58,
	},
	mirrorarmor: {
		onTryBoost(boost, target, source, effect) {
			// Don't bounce self stat changes, or boosts that have already bounced
			if (!source || target === source || !boost || effect.name === 'Mirror Armor') return;
			let b: BoostID;
			for (b in boost) {
				if (boost[b]! < 0) {
					if (target.boosts[b] === -6) continue;
					const negativeBoost: SparseBoostsTable = {};
					negativeBoost[b] = boost[b];
					delete boost[b];
					if (source.hp) {
						this.add('-ability', target, 'Mirror Armor');
						this.boost(negativeBoost, source, target, null, true);
					}
				}
			}
		},
		flags: { breakable: 1 },
		name: "Mirror Armor",
		rating: 2,
		num: 240,
	},
	mistysurge: {
		onStart(source) {
			this.field.setTerrain('mistyterrain');
		},
		flags: {},
		name: "Misty Surge",
		rating: 3.5,
		num: 228,
	},
	moldbreaker: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Mold Breaker');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		flags: {},
		name: "Mold Breaker",
		rating: 3,
		num: 104,
	},
	moody: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			let stats: BoostID[] = [];
			const boost: SparseBoostsTable = {};
			let statPlus: BoostID;
			for (statPlus in pokemon.boosts) {
				if (statPlus === 'accuracy' || statPlus === 'evasion') continue;
				if (pokemon.boosts[statPlus] < 6) {
					stats.push(statPlus);
				}
			}
			let randomStat: BoostID | undefined = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = 2;

			stats = [];
			let statMinus: BoostID;
			for (statMinus in pokemon.boosts) {
				if (statMinus === 'accuracy' || statMinus === 'evasion') continue;
				if (pokemon.boosts[statMinus] > -6 && statMinus !== randomStat) {
					stats.push(statMinus);
				}
			}
			randomStat = stats.length ? this.sample(stats) : undefined;
			if (randomStat) boost[randomStat] = -1;

			this.boost(boost, pokemon, pokemon);
		},
		flags: {},
		name: "Moody",
		rating: 5,
		num: 141,
	},
	motordrive: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.boost({ spe: 1 })) {
					this.add('-immune', target, '[from] ability: Motor Drive');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Motor Drive",
		rating: 3,
		num: 78,
	},
	moxie: {
		onSourceAfterFaint(length, target, source, effect) {
			if (effect && effect.effectType === 'Move') {
				this.boost({ atk: length }, source);
			}
		},
		flags: {},
		name: "Moxie",
		rating: 3,
		num: 153,
	},
	multiscale: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Multiscale weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Multiscale",
		rating: 3.5,
		num: 136,
	},
	multitype: {
		// Multitype's type-changing itself is implemented in statuses.js
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Multitype",
		rating: 4,
		num: 121,
	},
	mummy: {
		onDamagingHit(damage, target, source, move) {
			const sourceAbility = source.getAbility();
			if (sourceAbility.flags['cantsuppress'] || sourceAbility.id === 'mummy') {
				return;
			}
			if (this.checkMoveMakesContact(move, source, target, !source.isAlly(target))) {
				const oldAbility = source.setAbility('mummy', target);
				if (oldAbility) {
					this.add('-activate', target, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, `[of] ${source}`);
				}
			}
		},
		flags: {},
		name: "Mummy",
		rating: 2,
		num: 152,
	},
	myceliummight: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category === 'Status') {
				return -0.1;
			}
		},
		onModifyMove(move) {
			if (move.category === 'Status') {
				move.ignoreAbility = true;
			}
		},
		flags: {},
		name: "Mycelium Might",
		rating: 2,
		num: 298,
	},
	naturalcure: {
		onCheckShow(pokemon) {
			// This is complicated
			// For the most part, in-game, it's obvious whether or not Natural Cure activated,
			// since you can see how many of your opponent's pokemon are statused.
			// The only ambiguous situation happens in Doubles/Triples, where multiple pokemon
			// that could have Natural Cure switch out, but only some of them get cured.
			if (pokemon.side.active.length === 1) return;
			if (pokemon.showCure === true || pokemon.showCure === false) return;

			const cureList = [];
			let noCureCount = 0;
			for (const curPoke of pokemon.side.active) {
				// pokemon not statused
				if (!curPoke?.status) {
					// this.add('-message', "" + curPoke + " skipped: not statused or doesn't exist");
					continue;
				}
				if (curPoke.showCure) {
					// this.add('-message', "" + curPoke + " skipped: Natural Cure already known");
					continue;
				}
				const species = curPoke.species;
				// pokemon can't get Natural Cure
				if (!Object.values(species.abilities).includes('Natural Cure')) {
					// this.add('-message', "" + curPoke + " skipped: no Natural Cure");
					continue;
				}
				// pokemon's ability is known to be Natural Cure
				if (!species.abilities['1'] && !species.abilities['H']) {
					// this.add('-message', "" + curPoke + " skipped: only one ability");
					continue;
				}
				// pokemon isn't switching this turn
				if (curPoke !== pokemon && !this.queue.willSwitch(curPoke)) {
					// this.add('-message', "" + curPoke + " skipped: not switching");
					continue;
				}

				if (curPoke.hasAbility('naturalcure')) {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (and is)");
					cureList.push(curPoke);
				} else {
					// this.add('-message', "" + curPoke + " confirmed: could be Natural Cure (but isn't)");
					noCureCount++;
				}
			}

			if (!cureList.length || !noCureCount) {
				// It's possible to know what pokemon were cured
				for (const pkmn of cureList) {
					pkmn.showCure = true;
				}
			} else {
				// It's not possible to know what pokemon were cured

				// Unlike a -hint, this is real information that battlers need, so we use a -message
				this.add('-message', `(${cureList.length} of ${pokemon.side.name}'s pokemon ${cureList.length === 1 ? "was" : "were"} cured by Natural Cure.)`);

				for (const pkmn of cureList) {
					pkmn.showCure = false;
				}
			}
		},
		onSwitchOut(pokemon) {
			if (!pokemon.status) return;

			// if pokemon.showCure is undefined, it was skipped because its ability
			// is known
			if (pokemon.showCure === undefined) pokemon.showCure = true;

			if (pokemon.showCure) this.add('-curestatus', pokemon, pokemon.status, '[from] ability: Natural Cure');
			pokemon.clearStatus();

			// only reset .showCure if it's false
			// (once you know a Pokemon has Natural Cure, its cures are always known)
			if (!pokemon.showCure) pokemon.showCure = undefined;
		},
		flags: {},
		name: "Natural Cure",
		rating: 2.5,
		num: 30,
	},
	neuroforce: {
		onModifyDamage(damage, source, target, move) {
			if (move && target.getMoveHitData(move).typeMod > 0) {
				return this.chainModify([5120, 4096]);
			}
		},
		flags: {},
		name: "Neuroforce",
		rating: 2.5,
		num: 233,
	},
	neutralizinggas: {
		// Ability suppression implemented in sim/pokemon.ts:Pokemon#ignoringAbility
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			this.add('-ability', pokemon, 'Neutralizing Gas');
			pokemon.abilityState.ending = false;
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			for (const target of this.getAllActive()) {
				if (target.hasItem('Ability Shield')) {
					this.add('-block', target, 'item: Ability Shield');
					continue;
				}
				// Can't suppress a Tatsugiri inside of Dondozo already
				if (target.volatiles['commanding']) {
					continue;
				}
				if (target.illusion) {
					this.singleEvent('End', this.dex.abilities.get('Illusion'), target.abilityState, target, pokemon, 'neutralizinggas');
				}
				if (target.volatiles['slowstart']) {
					delete target.volatiles['slowstart'];
					this.add('-end', target, 'Slow Start', '[silent]');
				}
				if (strongWeathers.includes(target.getAbility().id)) {
					this.singleEvent('End', this.dex.abilities.get(target.getAbility().id), target.abilityState, target, pokemon, 'neutralizinggas');
				}
			}
		},
		onEnd(source) {
			if (source.transformed) return;
			for (const pokemon of this.getAllActive()) {
				if (pokemon !== source && pokemon.hasAbility('Neutralizing Gas')) {
					return;
				}
			}
			this.add('-end', source, 'ability: Neutralizing Gas');

			// FIXME this happens before the pokemon switches out, should be the opposite order.
			// Not an easy fix since we cant use a supported event. Would need some kind of special event that
			// gathers events to run after the switch and then runs them when the ability is no longer accessible.
			// (If you're tackling this, do note extreme weathers have the same issue)

			// Mark this pokemon's ability as ending so Pokemon#ignoringAbility skips it
			if (source.abilityState.ending) return;
			source.abilityState.ending = true;
			const sortedActive = this.getAllActive();
			this.speedSort(sortedActive);
			for (const pokemon of sortedActive) {
				if (pokemon !== source) {
					if (pokemon.getAbility().flags['cantsuppress']) continue; // does not interact with e.g Ice Face, Zen Mode
					if (pokemon.hasItem('abilityshield')) continue; // don't restart abilities that weren't suppressed

					// Will be suppressed by Pokemon#ignoringAbility if needed
					this.singleEvent('Start', pokemon.getAbility(), pokemon.abilityState, pokemon);
					if (pokemon.ability === "gluttony") {
						pokemon.abilityState.gluttony = false;
					}
				}
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Neutralizing Gas",
		rating: 3.5,
		num: 256,
	},
	noguard: {
		onAnyInvulnerabilityPriority: 1,
		onAnyInvulnerability(target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) return 0;
		},
		onAnyAccuracy(accuracy, target, source, move) {
			if (move && (source === this.effectState.target || target === this.effectState.target)) {
				return true;
			}
			return accuracy;
		},
		flags: {},
		name: "No Guard",
		rating: 4,
		num: 99,
	},
	normalize: {
		onModifyTypePriority: 1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'hiddenpower', 'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'struggle', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (!(move.isZ && move.category !== 'Status') &&
				// TODO: Figure out actual interaction
				(!noModifyType.includes(move.id) || this.activeMove?.isMax) && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Normal';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Normalize",
		rating: 0,
		num: 96,
	},
	oblivious: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['attract']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('attract');
				this.add('-end', pokemon, 'move: Attract', '[from] ability: Oblivious');
			}
			if (pokemon.volatiles['taunt']) {
				this.add('-activate', pokemon, 'ability: Oblivious');
				pokemon.removeVolatile('taunt');
				// Taunt's volatile already sends the -end message when removed
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'attract') return false;
		},
		onTryHit(pokemon, target, move) {
			if (move.id === 'attract' || move.id === 'captivate' || move.id === 'taunt') {
				this.add('-immune', pokemon, '[from] ability: Oblivious');
				return null;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Oblivious', `[of] ${target}`);
			}
		},
		flags: { breakable: 1 },
		name: "Oblivious",
		rating: 1.5,
		num: 12,
	},
	opportunist: {
		onFoeAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Opportunist' || effect?.name === 'Mirror Herb') return;
			if (!this.effectState.boosts) this.effectState.boosts = {} as SparseBoostsTable;
			const boostPlus = this.effectState.boosts;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! > 0) {
					boostPlus[i] = (boostPlus[i] || 0) + boost[i]!;
				}
			}
		},
		onAnySwitchInPriority: -3,
		onAnySwitchIn() {
			if (!this.effectState.boosts) return;
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
		},
		onAnyAfterMega() {
			if (!this.effectState.boosts) return;
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
		},
		onAnyAfterTerastallization() {
			if (!this.effectState.boosts) return;
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
		},
		onAnyAfterMove() {
			if (!this.effectState.boosts) return;
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (!this.effectState.boosts) return;
			this.boost(this.effectState.boosts, this.effectState.target);
			delete this.effectState.boosts;
		},
		onEnd() {
			delete this.effectState.boosts;
		},
		flags: {},
		name: "Opportunist",
		rating: 3,
		num: 290,
	},
	orichalcumpulse: {
		onStart(pokemon) {
			if (this.field.setWeather('sunnyday')) {
				this.add('-activate', pokemon, 'Orichalcum Pulse', '[source]');
			} else if (this.field.isWeather('sunnyday')) {
				this.add('-activate', pokemon, 'ability: Orichalcum Pulse');
			}
		},
		onModifyAtkPriority: 5,
		onModifyAtk(atk, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				this.debug('Orichalcum boost');
				return this.chainModify([5461, 4096]);
			}
		},
		flags: {},
		name: "Orichalcum Pulse",
		rating: 4.5,
		num: 288,
	},
	overcoat: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm' || type === 'hail' || type === 'powder') return false;
		},
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (move.flags['powder'] && target !== source && this.dex.getImmunity('powder', target)) {
				this.add('-immune', target, '[from] ability: Overcoat');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Overcoat",
		rating: 2,
		num: 142,
	},
	overgrow: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Grass' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Overgrow boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Overgrow",
		rating: 2,
		num: 65,
	},
	owntempo: {
		onUpdate(pokemon) {
			if (pokemon.volatiles['confusion']) {
				this.add('-activate', pokemon, 'ability: Own Tempo');
				pokemon.removeVolatile('confusion');
			}
		},
		onTryAddVolatile(status, pokemon) {
			if (status.id === 'confusion') return null;
		},
		onHit(target, source, move) {
			if (move?.volatileStatus === 'confusion') {
				this.add('-immune', target, 'confusion', '[from] ability: Own Tempo');
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Own Tempo', `[of] ${target}`);
			}
		},
		flags: { breakable: 1 },
		name: "Own Tempo",
		rating: 1.5,
		num: 20,
	},
	parentalbond: {
		onPrepareHit(source, target, move) {
			if (move.category === 'Status' || move.multihit || move.flags['noparentalbond'] || move.flags['charge'] ||
				move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
			move.multihit = 2;
			move.multihitType = 'parentalbond';
		},
		// Damage modifier implemented in BattleActions#modifyDamage()
		onSourceModifySecondaries(secondaries, target, source, move) {
			if (move.multihitType === 'parentalbond' && move.id === 'secretpower' && move.hit < 2) {
				// hack to prevent accidentally suppressing King's Rock/Razor Fang
				return secondaries.filter(effect => effect.volatileStatus === 'flinch');
			}
		},
		flags: {},
		name: "Parental Bond",
		rating: 4.5,
		num: 185,
	},
	pastelveil: {
		onStart(pokemon) {
			for (const ally of pokemon.alliesAndSelf()) {
				if (['psn', 'tox'].includes(ally.status)) {
					this.add('-activate', pokemon, 'ability: Pastel Veil');
					ally.cureStatus();
				}
			}
		},
		onUpdate(pokemon) {
			if (['psn', 'tox'].includes(pokemon.status)) {
				this.add('-activate', pokemon, 'ability: Pastel Veil');
				pokemon.cureStatus();
			}
		},
		onAnySwitchIn() {
			((this.effect as any).onStart as (p: Pokemon) => void).call(this, this.effectState.target);
		},
		onSetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Pastel Veil');
			}
			return false;
		},
		onAllySetStatus(status, target, source, effect) {
			if (!['psn', 'tox'].includes(status.id)) return;
			if ((effect as Move)?.status) {
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Pastel Veil', `[of] ${effectHolder}`);
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Pastel Veil",
		rating: 2,
		num: 257,
	},
	perishbody: {
		onDamagingHit(damage, target, source, move) {
			if (!this.checkMoveMakesContact(move, source, target) || source.volatiles['perishsong']) return;
			this.add('-ability', target, 'Perish Body');
			source.addVolatile('perishsong');
			target.addVolatile('perishsong');
		},
		flags: {},
		name: "Perish Body",
		rating: 1,
		num: 253,
	},
	pickpocket: {
		onAfterMoveSecondary(target, source, move) {
			if (source && source !== target && move?.flags['contact']) {
				if (target.item || target.switchFlag || target.forceSwitchFlag || source.switchFlag === true) {
					return;
				}
				const yourItem = source.takeItem(target);
				if (!yourItem) {
					return;
				}
				if (!target.setItem(yourItem)) {
					source.item = yourItem.id;
					return;
				}
				this.add('-enditem', source, yourItem, '[silent]', '[from] ability: Pickpocket', `[of] ${source}`);
				this.add('-item', target, yourItem, '[from] ability: Pickpocket', `[of] ${source}`);
			}
		},
		flags: {},
		name: "Pickpocket",
		rating: 1,
		num: 124,
	},
	pickup: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.item) return;
			const pickupTargets = this.getAllActive().filter(target => (
				target.lastItem && target.usedItemThisTurn && pokemon.isAdjacent(target)
			));
			if (!pickupTargets.length) return;
			const randomTarget = this.sample(pickupTargets);
			const item = randomTarget.lastItem;
			randomTarget.lastItem = '';
			this.add('-item', pokemon, this.dex.items.get(item), '[from] ability: Pickup');
			pokemon.setItem(item);
		},
		flags: {},
		name: "Pickup",
		rating: 0.5,
		num: 53,
	},
	pixilate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Fairy';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Pixilate",
		rating: 4,
		num: 182,
	},
	plus: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			for (const allyActive of pokemon.allies()) {
				if (allyActive.hasAbility(['minus', 'plus'])) {
					return this.chainModify(1.5);
				}
			}
		},
		flags: {},
		name: "Plus",
		rating: 0,
		num: 57,
	},
	poisonheal: {
		onDamagePriority: 1,
		onDamage(damage, target, source, effect) {
			if (effect.id === 'psn' || effect.id === 'tox') {
				this.heal(target.baseMaxhp / 8);
				return false;
			}
		},
		flags: {},
		name: "Poison Heal",
		rating: 4,
		num: 90,
	},
	poisonpoint: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('psn', target);
				}
			}
		},
		flags: {},
		name: "Poison Point",
		rating: 1.5,
		num: 38,
	},
	poisonpuppeteer: {
		onAnyAfterSetStatus(status, target, source, effect) {
			if (source.baseSpecies.name !== "Pecharunt") return;
			if (source !== this.effectState.target || target === source || effect.effectType !== 'Move') return;
			if (status.id === 'psn' || status.id === 'tox') {
				target.addVolatile('confusion');
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
		name: "Poison Puppeteer",
		rating: 3,
		num: 310,
	},
	poisontouch: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Poison Touch's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;
			if (this.checkMoveMakesContact(move, target, source)) {
				if (this.randomChance(3, 10)) {
					target.trySetStatus('psn', source);
				}
			}
		},
		flags: {},
		name: "Poison Touch",
		rating: 2,
		num: 143,
	},
	powerconstruct: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Zygarde' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.species.id === 'zygardecomplete' || pokemon.hp > pokemon.maxhp / 2) return;
			this.add('-activate', pokemon, 'ability: Power Construct');
			pokemon.formeChange('Zygarde-Complete', this.effect, true);
			pokemon.formeRegression = true;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Power Construct",
		rating: 5,
		num: 211,
	},
	powerofalchemy: {
		onAllyFaint(target) {
			if (!this.effectState.target.hp) return;
			const ability = target.getAbility();
			if (ability.flags['noreceiver'] || ability.id === 'noability') return;
			this.effectState.target.setAbility(ability, target);
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
		name: "Power of Alchemy",
		rating: 0,
		num: 223,
	},
	powerspot: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (attacker !== this.effectState.target) {
				this.debug('Power Spot boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Power Spot",
		rating: 0,
		num: 249,
	},
	prankster: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.category === 'Status') {
				move.pranksterBoosted = true;
				return priority + 1;
			}
		},
		flags: {},
		name: "Prankster",
		rating: 4,
		num: 158,
	},
	pressure: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Pressure');
		},
		onDeductPP(target, source) {
			if (target.isAlly(source)) return;
			return 1;
		},
		flags: {},
		name: "Pressure",
		rating: 2.5,
		num: 46,
	},
	primordialsea: {
		onStart(source) {
			this.field.setWeather('primordialsea');
		},
		onAnySetWeather(target, source, weather) {
			const strongWeathers = ['desolateland', 'primordialsea', 'deltastream'];
			if (this.field.getWeather().id === 'primordialsea' && !strongWeathers.includes(weather.id)) return false;
		},
		onEnd(pokemon) {
			if (this.field.weatherState.source !== pokemon) return;
			for (const target of this.getAllActive()) {
				if (target === pokemon) continue;
				if (target.hasAbility('primordialsea')) {
					this.field.weatherState.source = target;
					return;
				}
			}
			this.field.clearWeather();
		},
		flags: {},
		name: "Primordial Sea",
		rating: 4.5,
		num: 189,
	},
	prismarmor: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Prism Armor neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: {},
		name: "Prism Armor",
		rating: 3,
		num: 232,
	},
	propellertail: {
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		flags: {},
		name: "Propeller Tail",
		rating: 0,
		num: 239,
	},
	protean: {
		onPrepareHit(source, target, move) {
			if (this.effectState.protean === source.previouslySwitchedIn) return;
			if (move.hasBounced || move.flags['futuremove'] || move.sourceEffect === 'snatch' || move.callsMove) return;
			const type = move.type;
			if (type && type !== '???' && source.getTypes().join() !== type) {
				if (!source.setType(type)) return;
				this.effectState.protean = source.previouslySwitchedIn;
				this.add('-start', source, 'typechange', type, '[from] ability: Protean');
			}
		},
		flags: {},
		name: "Protean",
		rating: 4,
		num: 168,
	},
	protosynthesis: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('WeatherChange', this.effect, this.effectState, pokemon);
		},
		onWeatherChange(pokemon) {
			// Protosynthesis is not affected by Utility Umbrella
			if (this.field.isWeather('sunnyday')) {
				pokemon.addVolatile('protosynthesis');
			} else if (!pokemon.volatiles['protosynthesis']?.fromBooster && !this.field.isWeather('sunnyday')) {
				pokemon.removeVolatile('protosynthesis');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['protosynthesis'];
			this.add('-end', pokemon, 'Protosynthesis', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Protosynthesis', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Protosynthesis');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'protosynthesis' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Protosynthesis spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Protosynthesis');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Protosynthesis",
		rating: 3,
		num: 281,
	},
	psychicsurge: {
		onStart(source) {
			this.field.setTerrain('psychicterrain');
		},
		flags: {},
		name: "Psychic Surge",
		rating: 4,
		num: 227,
	},
	punkrock: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.flags['sound']) {
				this.debug('Punk Rock weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Punk Rock",
		rating: 3.5,
		num: 244,
	},
	purepower: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk) {
			return this.chainModify(2);
		},
		flags: {},
		name: "Pure Power",
		rating: 5,
		num: 74,
	},
	purifyingsalt: {
		onSetStatus(status, target, source, effect) {
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Purifying Salt');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Purifying Salt');
				return null;
			}
		},
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(spa, attacker, defender, move) {
			if (move.type === 'Ghost') {
				this.debug('Purifying Salt weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Purifying Salt",
		rating: 4,
		num: 272,
	},
	quarkdrive: {
		onSwitchInPriority: -2,
		onStart(pokemon) {
			this.singleEvent('TerrainChange', this.effect, this.effectState, pokemon);
		},
		onTerrainChange(pokemon) {
			if (this.field.isTerrain('electricterrain')) {
				pokemon.addVolatile('quarkdrive');
			} else if (!pokemon.volatiles['quarkdrive']?.fromBooster) {
				pokemon.removeVolatile('quarkdrive');
			}
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['quarkdrive'];
			this.add('-end', pokemon, 'Quark Drive', '[silent]');
		},
		condition: {
			noCopy: true,
			onStart(pokemon, source, effect) {
				if (effect?.name === 'Booster Energy') {
					this.effectState.fromBooster = true;
					this.add('-activate', pokemon, 'ability: Quark Drive', '[fromitem]');
				} else {
					this.add('-activate', pokemon, 'ability: Quark Drive');
				}
				this.effectState.bestStat = pokemon.getBestStat(false, true);
				this.add('-start', pokemon, 'quarkdrive' + this.effectState.bestStat);
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				if (this.effectState.bestStat !== 'atk' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive atk boost');
				return this.chainModify([5325, 4096]);
			},
			onModifyDefPriority: 6,
			onModifyDef(def, pokemon) {
				if (this.effectState.bestStat !== 'def' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive def boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpAPriority: 5,
			onModifySpA(spa, pokemon) {
				if (this.effectState.bestStat !== 'spa' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spa boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpDPriority: 6,
			onModifySpD(spd, pokemon) {
				if (this.effectState.bestStat !== 'spd' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spd boost');
				return this.chainModify([5325, 4096]);
			},
			onModifySpe(spe, pokemon) {
				if (this.effectState.bestStat !== 'spe' || pokemon.ignoringAbility()) return;
				this.debug('Quark Drive spe boost');
				return this.chainModify(1.5);
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Quark Drive');
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, notransform: 1 },
		name: "Quark Drive",
		rating: 3,
		num: 282,
	},
	queenlymajesty: {
		onFoeTryMove(target, source, move) {
			const targetAllExceptions = ['perishsong', 'flowershield', 'rototiller'];
			if (move.target === 'foeSide' || (move.target === 'all' && !targetAllExceptions.includes(move.id))) {
				return;
			}

			const dazzlingHolder = this.effectState.target;
			if ((source.isAlly(dazzlingHolder) || move.target === 'all') && move.priority > 0.1) {
				this.attrLastMove('[still]');
				this.add('cant', dazzlingHolder, 'ability: Queenly Majesty', move, `[of] ${target}`);
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Queenly Majesty",
		rating: 2.5,
		num: 214,
	},
	quickdraw: {
		onFractionalPriorityPriority: -1,
		onFractionalPriority(priority, pokemon, target, move) {
			if (move.category !== "Status" && this.randomChance(3, 10)) {
				this.add('-activate', pokemon, 'ability: Quick Draw');
				return 0.1;
			}
		},
		flags: {},
		name: "Quick Draw",
		rating: 2.5,
		num: 259,
	},
	quickfeet: {
		onModifySpe(spe, pokemon) {
			if (pokemon.status) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Quick Feet",
		rating: 2.5,
		num: 95,
	},
	raindish: {
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'raindance' || effect.id === 'primordialsea') {
				this.heal(target.baseMaxhp / 16);
			}
		},
		flags: {},
		name: "Rain Dish",
		rating: 1.5,
		num: 44,
	},
	rattled: {
		onDamagingHit(damage, target, source, move) {
			if (['Dark', 'Bug', 'Ghost'].includes(move.type)) {
				this.boost({ spe: 1 });
			}
		},
		onAfterBoost(boost, target, source, effect) {
			if (effect?.name === 'Intimidate' && boost.atk) {
				this.boost({ spe: 1 });
			}
		},
		flags: {},
		name: "Rattled",
		rating: 1,
		num: 155,
	},
	receiver: {
		onAllyFaint(target) {
			if (!this.effectState.target.hp) return;
			const ability = target.getAbility();
			if (ability.flags['noreceiver'] || ability.id === 'noability') return;
			this.effectState.target.setAbility(ability, target);
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
		name: "Receiver",
		rating: 0,
		num: 222,
	},
	reckless: {
		onBasePowerPriority: 23,
		onBasePower(basePower, attacker, defender, move) {
			if (move.recoil || move.hasCrashDamage) {
				this.debug('Reckless boost');
				return this.chainModify([4915, 4096]);
			}
		},
		flags: {},
		name: "Reckless",
		rating: 3,
		num: 120,
	},
	refrigerate: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			const noModifyType = [
				'judgment', 'multiattack', 'naturalgift', 'revelationdance', 'technoblast', 'terrainpulse', 'weatherball',
			];
			if (move.type === 'Normal' && (!noModifyType.includes(move.id) || this.activeMove?.isMax) &&
				!(move.isZ && move.category !== 'Status') && !(move.name === 'Tera Blast' && pokemon.terastallized)) {
				move.type = 'Ice';
				move.typeChangerBoosted = this.effect;
			}
		},
		onBasePowerPriority: 23,
		onBasePower(basePower, pokemon, target, move) {
			if (move.typeChangerBoosted === this.effect) return this.chainModify([4915, 4096]);
		},
		flags: {},
		name: "Refrigerate",
		rating: 4,
		num: 174,
	},
	regenerator: {
		onSwitchOut(pokemon) {
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
		name: "Regenerator",
		rating: 4.5,
		num: 144,
	},
	ripen: {
		onTryHeal(damage, target, source, effect) {
			if (!effect) return;
			if (effect.name === 'Berry Juice' || effect.name === 'Leftovers') {
				this.add('-activate', target, 'ability: Ripen');
			}
			if ((effect as Item).isBerry) return this.chainModify(2);
		},
		onChangeBoost(boost, target, source, effect) {
			if (effect && (effect as Item).isBerry) {
				let b: BoostID;
				for (b in boost) {
					boost[b]! *= 2;
				}
			}
		},
		onSourceModifyDamagePriority: -1,
		onSourceModifyDamage(damage, source, target, move) {
			if (target.abilityState.berryWeaken) {
				target.abilityState.berryWeaken = false;
				return this.chainModify(0.5);
			}
		},
		onTryEatItemPriority: -1,
		onTryEatItem(item, pokemon) {
			this.add('-activate', pokemon, 'ability: Ripen');
		},
		onEatItem(item, pokemon) {
			const weakenBerries = [
				'Babiri Berry', 'Charti Berry', 'Chilan Berry', 'Chople Berry', 'Coba Berry', 'Colbur Berry', 'Haban Berry', 'Kasib Berry', 'Kebia Berry', 'Occa Berry', 'Passho Berry', 'Payapa Berry', 'Rindo Berry', 'Roseli Berry', 'Shuca Berry', 'Tanga Berry', 'Wacan Berry', 'Yache Berry',
			];
			// Record if the pokemon ate a berry to resist the attack
			pokemon.abilityState.berryWeaken = weakenBerries.includes(item.name);
		},
		flags: {},
		name: "Ripen",
		rating: 2,
		num: 247,
	},
	rivalry: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (attacker.gender && defender.gender) {
				if (attacker.gender === defender.gender) {
					this.debug('Rivalry boost');
					return this.chainModify(1.25);
				} else {
					this.debug('Rivalry weaken');
					return this.chainModify(0.75);
				}
			}
		},
		flags: {},
		name: "Rivalry",
		rating: 0,
		num: 79,
	},
	rkssystem: {
		// RKS System's type-changing itself is implemented in statuses.js
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "RKS System",
		rating: 4,
		num: 225,
	},
	rockhead: {
		onDamage(damage, target, source, effect) {
			if (effect.id === 'recoil') {
				if (!this.activeMove) throw new Error("Battle.activeMove is null");
				if (this.activeMove.id !== 'struggle') return null;
			}
		},
		flags: {},
		name: "Rock Head",
		rating: 3,
		num: 69,
	},
	rockypayload: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Rock') {
				this.debug('Rocky Payload boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Rocky Payload",
		rating: 3.5,
		num: 276,
	},
	roughskin: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.damage(source.baseMaxhp / 8, source, target);
			}
		},
		flags: {},
		name: "Rough Skin",
		rating: 2.5,
		num: 24,
	},
	runaway: {
		flags: {},
		name: "Run Away",
		rating: 0,
		num: 50,
	},
	sandforce: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.field.isWeather('sandstorm')) {
				if (move.type === 'Rock' || move.type === 'Ground' || move.type === 'Steel') {
					this.debug('Sand Force boost');
					return this.chainModify([5325, 4096]);
				}
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		flags: {},
		name: "Sand Force",
		rating: 2,
		num: 159,
	},
	sandrush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather('sandstorm')) {
				return this.chainModify(2);
			}
		},
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		flags: {},
		name: "Sand Rush",
		rating: 3,
		num: 146,
	},
	sandspit: {
		onDamagingHit(damage, target, source, move) {
			this.field.setWeather('sandstorm');
		},
		flags: {},
		name: "Sand Spit",
		rating: 1,
		num: 245,
	},
	sandstream: {
		onStart(source) {
			this.field.setWeather('sandstorm');
		},
		flags: {},
		name: "Sand Stream",
		rating: 4,
		num: 45,
	},
	sandveil: {
		onImmunity(type, pokemon) {
			if (type === 'sandstorm') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather('sandstorm')) {
				this.debug('Sand Veil - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: { breakable: 1 },
		name: "Sand Veil",
		rating: 1.5,
		num: 8,
	},
	sapsipper: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Grass') {
				if (!this.boost({ atk: 1 })) {
					this.add('-immune', target, '[from] ability: Sap Sipper');
				}
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (source === this.effectState.target || !target.isAlly(source)) return;
			if (move.type === 'Grass') {
				this.boost({ atk: 1 }, this.effectState.target);
			}
		},
		flags: { breakable: 1 },
		name: "Sap Sipper",
		rating: 3,
		num: 157,
	},
	schooling: {
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (
				pokemon.baseSpecies.baseSpecies !== 'Wishiwashi' || pokemon.level < 20 ||
				pokemon.transformed || !pokemon.hp
			) return;
			if (pokemon.hp > pokemon.maxhp / 4) {
				if (pokemon.species.id === 'wishiwashi') {
					pokemon.formeChange('Wishiwashi-School');
				}
			} else {
				if (pokemon.species.id === 'wishiwashischool') {
					pokemon.formeChange('Wishiwashi');
				}
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Schooling",
		rating: 3,
		num: 208,
	},
	scrappy: {
		onModifyMovePriority: -5,
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Fighting'] = true;
				move.ignoreImmunity['Normal'] = true;
			}
		},
		onTryBoost(boost, target, source, effect) {
			if (effect.name === 'Intimidate' && boost.atk) {
				delete boost.atk;
				this.add('-fail', target, 'unboost', 'Attack', '[from] ability: Scrappy', `[of] ${target}`);
			}
		},
		flags: {},
		name: "Scrappy",
		rating: 3,
		num: 113,
	},
	screencleaner: {
		onStart(pokemon) {
			let activated = false;
			for (const sideCondition of ['reflect', 'lightscreen', 'auroraveil']) {
				for (const side of [pokemon.side, ...pokemon.side.foeSidesWithConditions()]) {
					if (side.getSideCondition(sideCondition)) {
						if (!activated) {
							this.add('-activate', pokemon, 'ability: Screen Cleaner');
							activated = true;
						}
						side.removeSideCondition(sideCondition);
					}
				}
			}
		},
		flags: {},
		name: "Screen Cleaner",
		rating: 2,
		num: 251,
	},
	seedsower: {
		onDamagingHit(damage, target, source, move) {
			this.field.setTerrain('grassyterrain');
		},
		flags: {},
		name: "Seed Sower",
		rating: 2.5,
		num: 269,
	},
	serenegrace: {
		onModifyMovePriority: -2,
		onModifyMove(move) {
			if (move.secondaries) {
				this.debug('doubling secondary chance');
				for (const secondary of move.secondaries) {
					if (secondary.chance) secondary.chance *= 2;
				}
			}
			if (move.self?.chance) move.self.chance *= 2;
		},
		flags: {},
		name: "Serene Grace",
		rating: 3.5,
		num: 32,
	},
	shadowshield: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.hp >= target.maxhp) {
				this.debug('Shadow Shield weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {},
		name: "Shadow Shield",
		rating: 3.5,
		num: 231,
	},
	shadowtag: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (!pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		flags: {},
		name: "Shadow Tag",
		rating: 5,
		num: 23,
	},
	sharpness: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['slicing']) {
				this.debug('Sharpness boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Sharpness",
		rating: 3.5,
		num: 292,
	},
	shedskin: {
		onResidualOrder: 5,
		onResidualSubOrder: 3,
		onResidual(pokemon) {
			if (pokemon.hp && pokemon.status && this.randomChance(33, 100)) {
				this.debug('shed skin');
				this.add('-activate', pokemon, 'ability: Shed Skin');
				pokemon.cureStatus();
			}
		},
		flags: {},
		name: "Shed Skin",
		rating: 3,
		num: 61,
	},
	sheerforce: {
		onModifyMove(move, pokemon) {
			if (move.secondaries) {
				delete move.secondaries;
				// Technically not a secondary effect, but it is negated
				delete move.self;
				if (move.id === 'clangoroussoulblaze') delete move.selfBoost;
				// Actual negation of `AfterMoveSecondary` effects implemented in scripts.js
				move.hasSheerForce = true;
			}
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, pokemon, target, move) {
			if (move.hasSheerForce) return this.chainModify([5325, 4096]);
		},
		flags: {},
		name: "Sheer Force",
		rating: 3.5,
		num: 125,
	},
	shellarmor: {
		onCriticalHit: false,
		flags: { breakable: 1 },
		name: "Shell Armor",
		rating: 1,
		num: 75,
	},
	shielddust: {
		onModifySecondaries(secondaries) {
			this.debug('Shield Dust prevent secondary');
			return secondaries.filter(effect => !!effect.self);
		},
		flags: { breakable: 1 },
		name: "Shield Dust",
		rating: 2,
		num: 19,
	},
	shieldsdown: {
		onSwitchInPriority: -1,
		onStart(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Minior' || pokemon.transformed || !pokemon.hp) return;
			if (pokemon.hp > pokemon.maxhp / 2) {
				if (pokemon.species.forme !== 'Meteor') {
					pokemon.formeChange('Minior-Meteor');
				}
			} else {
				if (pokemon.species.forme === 'Meteor') {
					pokemon.formeChange(pokemon.set.species);
				}
			}
		},
		onSetStatus(status, target, source, effect) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Shields Down');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (target.species.id !== 'miniormeteor' || target.transformed) return;
			if (status.id !== 'yawn') return;
			this.add('-immune', target, '[from] ability: Shields Down');
			return null;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Shields Down",
		rating: 3,
		num: 197,
	},
	simple: {
		onChangeBoost(boost, target, source, effect) {
			if (effect && effect.id === 'zpower') return;
			let i: BoostID;
			for (i in boost) {
				boost[i]! *= 2;
			}
		},
		flags: { breakable: 1 },
		name: "Simple",
		rating: 4,
		num: 86,
	},
	skilllink: {
		onModifyMove(move) {
			if (move.multihit && Array.isArray(move.multihit) && move.multihit.length) {
				move.multihit = move.multihit[1];
			}
			if (move.multiaccuracy) {
				delete move.multiaccuracy;
			}
		},
		flags: {},
		name: "Skill Link",
		rating: 3,
		num: 92,
	},
	slowstart: {
		onStart(pokemon) {
			pokemon.addVolatile('slowstart');
		},
		onEnd(pokemon) {
			delete pokemon.volatiles['slowstart'];
			this.add('-end', pokemon, 'Slow Start', '[silent]');
		},
		condition: {
			duration: 5,
			onResidualOrder: 28,
			onResidualSubOrder: 2,
			onStart(target) {
				this.add('-start', target, 'ability: Slow Start');
			},
			onResidual(pokemon) {
				if (!pokemon.activeTurns) {
					this.effectState.duration! += 1;
				}
			},
			onModifyAtkPriority: 5,
			onModifyAtk(atk, pokemon) {
				return this.chainModify(0.5);
			},
			onModifySpe(spe, pokemon) {
				return this.chainModify(0.5);
			},
			onEnd(target) {
				this.add('-end', target, 'Slow Start');
			},
		},
		flags: {},
		name: "Slow Start",
		rating: -1,
		num: 112,
	},
	slushrush: {
		onModifySpe(spe, pokemon) {
			if (this.field.isWeather(['hail', 'snowscape'])) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Slush Rush",
		rating: 3,
		num: 202,
	},
	sniper: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).crit) {
				this.debug('Sniper boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Sniper",
		rating: 2,
		num: 97,
	},
	snowcloak: {
		onImmunity(type, pokemon) {
			if (type === 'hail') return false;
		},
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy) {
			if (typeof accuracy !== 'number') return;
			if (this.field.isWeather(['hail', 'snowscape'])) {
				this.debug('Snow Cloak - decreasing accuracy');
				return this.chainModify([3277, 4096]);
			}
		},
		flags: { breakable: 1 },
		name: "Snow Cloak",
		rating: 1.5,
		num: 81,
	},
	snowwarning: {
		onStart(source) {
			this.field.setWeather('snowscape');
		},
		flags: {},
		name: "Snow Warning",
		rating: 4,
		num: 117,
	},
	solarpower: {
		onModifySpAPriority: 5,
		onModifySpA(spa, pokemon) {
			if (['sunnyday', 'desolateland'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(1.5);
			}
		},
		onWeather(target, source, effect) {
			if (target.hasItem('utilityumbrella')) return;
			if (effect.id === 'sunnyday' || effect.id === 'desolateland') {
				this.damage(target.baseMaxhp / 8, target, target);
			}
		},
		flags: {},
		name: "Solar Power",
		rating: 2,
		num: 94,
	},
	solidrock: {
		onSourceModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod > 0) {
				this.debug('Solid Rock neutralize');
				return this.chainModify(0.75);
			}
		},
		flags: { breakable: 1 },
		name: "Solid Rock",
		rating: 3,
		num: 116,
	},
	soulheart: {
		onAnyFaintPriority: 1,
		onAnyFaint() {
			this.boost({ spa: 1 }, this.effectState.target);
		},
		flags: {},
		name: "Soul-Heart",
		rating: 3.5,
		num: 220,
	},
	soundproof: {
		onTryHit(target, source, move) {
			if (target !== source && move.flags['sound']) {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if (move.flags['sound']) {
				this.add('-immune', this.effectState.target, '[from] ability: Soundproof');
			}
		},
		flags: { breakable: 1 },
		name: "Soundproof",
		rating: 2,
		num: 43,
	},
	speedboost: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (pokemon.activeTurns) {
				this.boost({ spe: 1 });
			}
		},
		flags: {},
		name: "Speed Boost",
		rating: 4.5,
		num: 3,
	},
	stakeout: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender) {
			if (!defender.activeTurns) {
				this.debug('Stakeout boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Stakeout",
		rating: 4.5,
		num: 198,
	},
	stall: {
		onFractionalPriority: -0.1,
		flags: {},
		name: "Stall",
		rating: -1,
		num: 100,
	},
	stalwart: {
		onModifyMovePriority: 1,
		onModifyMove(move) {
			// most of the implementation is in Battle#getTarget
			move.tracksTarget = move.target !== 'scripted';
		},
		flags: {},
		name: "Stalwart",
		rating: 0,
		num: 242,
	},
	stamina: {
		onDamagingHit(damage, target, source, effect) {
			this.boost({ def: 1 });
		},
		flags: {},
		name: "Stamina",
		rating: 4,
		num: 192,
	},
	stancechange: {
		onModifyMovePriority: 1,
		onModifyMove(move, attacker, defender) {
			if (attacker.species.baseSpecies !== 'Aegislash' || attacker.transformed) return;
			if (move.category === 'Status' && move.id !== 'kingsshield') return;
			const targetForme = (move.id === 'kingsshield' ? 'Aegislash' : 'Aegislash-Blade');
			if (attacker.species.name !== targetForme) attacker.formeChange(targetForme);
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Stance Change",
		rating: 4,
		num: 176,
	},
	static: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target)) {
				if (this.randomChance(3, 10)) {
					source.trySetStatus('par', target);
				}
			}
		},
		flags: {},
		name: "Static",
		rating: 2,
		num: 9,
	},
	steadfast: {
		onFlinch(pokemon) {
			this.boost({ spe: 1 });
		},
		flags: {},
		name: "Steadfast",
		rating: 1,
		num: 80,
	},
	steamengine: {
		onDamagingHit(damage, target, source, move) {
			if (['Water', 'Fire'].includes(move.type)) {
				this.boost({ spe: 6 });
			}
		},
		flags: {},
		name: "Steam Engine",
		rating: 2,
		num: 243,
	},
	steelworker: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steelworker boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Steelworker",
		rating: 3.5,
		num: 200,
	},
	steelyspirit: {
		onAllyBasePowerPriority: 22,
		onAllyBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Steel') {
				this.debug('Steely Spirit boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Steely Spirit",
		rating: 3.5,
		num: 252,
	},
	stench: {
		onModifyMovePriority: -1,
		onModifyMove(move) {
			if (move.category !== "Status") {
				this.debug('Adding Stench flinch');
				if (!move.secondaries) move.secondaries = [];
				for (const secondary of move.secondaries) {
					if (secondary.volatileStatus === 'flinch') return;
				}
				move.secondaries.push({
					chance: 10,
					volatileStatus: 'flinch',
				});
			}
		},
		flags: {},
		name: "Stench",
		rating: 0.5,
		num: 1,
	},
	stickyhold: {
		onTakeItem(item, pokemon, source) {
			if (!this.activeMove) throw new Error("Battle.activeMove is null");
			if (!pokemon.hp || pokemon.item === 'stickybarb') return;
			if ((source && source !== pokemon) || this.activeMove.id === 'knockoff') {
				this.add('-activate', pokemon, 'ability: Sticky Hold');
				return false;
			}
		},
		flags: { breakable: 1 },
		name: "Sticky Hold",
		rating: 1.5,
		num: 60,
	},
	stormdrain: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.boost({ spa: 1 })) {
					this.add('-immune', target, '[from] ability: Storm Drain');
				}
				return null;
			}
		},
		onAnyRedirectTarget(target, source, source2, move) {
			if (move.type !== 'Water' || move.flags['pledgecombo']) return;
			const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
			if (this.validTarget(this.effectState.target, source, redirectTarget)) {
				if (move.smartTarget) move.smartTarget = false;
				if (this.effectState.target !== target) {
					this.add('-activate', this.effectState.target, 'ability: Storm Drain');
				}
				return this.effectState.target;
			}
		},
		flags: { breakable: 1 },
		name: "Storm Drain",
		rating: 3,
		num: 114,
	},
	strongjaw: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['bite']) {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Strong Jaw",
		rating: 3.5,
		num: 173,
	},
	sturdy: {
		onTryHit(pokemon, target, move) {
			if (move.ohko) {
				this.add('-immune', pokemon, '[from] ability: Sturdy');
				return null;
			}
		},
		onDamagePriority: -30,
		onDamage(damage, target, source, effect) {
			if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === 'Move') {
				this.add('-ability', target, 'Sturdy');
				return target.hp - 1;
			}
		},
		flags: { breakable: 1 },
		name: "Sturdy",
		rating: 3,
		num: 5,
	},
	suctioncups: {
		onDragOutPriority: 1,
		onDragOut(pokemon) {
			this.add('-activate', pokemon, 'ability: Suction Cups');
			return null;
		},
		flags: { breakable: 1 },
		name: "Suction Cups",
		rating: 1,
		num: 21,
	},
	superluck: {
		onModifyCritRatio(critRatio) {
			return critRatio + 1;
		},
		flags: {},
		name: "Super Luck",
		rating: 1.5,
		num: 105,
	},
	supersweetsyrup: {
		onStart(pokemon) {
			if (pokemon.syrupTriggered) return;
			pokemon.syrupTriggered = true;
			this.add('-ability', pokemon, 'Supersweet Syrup');
			for (const target of pokemon.adjacentFoes()) {
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({ evasion: -1 }, target, pokemon, null, true);
				}
			}
		},
		flags: {},
		name: "Supersweet Syrup",
		rating: 1.5,
		num: 306,
	},
	supremeoverlord: {
		onStart(pokemon) {
			if (pokemon.side.totalFainted) {
				this.add('-activate', pokemon, 'ability: Supreme Overlord');
				const fallen = Math.min(pokemon.side.totalFainted, 5);
				this.add('-start', pokemon, `fallen${fallen}`, '[silent]');
				this.effectState.fallen = fallen;
			}
		},
		onEnd(pokemon) {
			this.add('-end', pokemon, `fallen${this.effectState.fallen}`, '[silent]');
		},
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (this.effectState.fallen) {
				const powMod = [4096, 4506, 4915, 5325, 5734, 6144];
				this.debug(`Supreme Overlord boost: ${powMod[this.effectState.fallen]}/4096`);
				return this.chainModify([powMod[this.effectState.fallen], 4096]);
			}
		},
		flags: {},
		name: "Supreme Overlord",
		rating: 4,
		num: 293,
	},
	surgesurfer: {
		onModifySpe(spe) {
			if (this.field.isTerrain('electricterrain')) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Surge Surfer",
		rating: 3,
		num: 207,
	},
	swarm: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Bug' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Swarm boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Swarm",
		rating: 2,
		num: 68,
	},
	sweetveil: {
		onAllySetStatus(status, target, source, effect) {
			if (status.id === 'slp') {
				this.debug('Sweet Veil interrupts sleep');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Sweet Veil', `[of] ${effectHolder}`);
				return null;
			}
		},
		onAllyTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.debug('Sweet Veil blocking yawn');
				const effectHolder = this.effectState.target;
				this.add('-block', target, 'ability: Sweet Veil', `[of] ${effectHolder}`);
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Sweet Veil",
		rating: 2,
		num: 175,
	},
	swiftswim: {
		onModifySpe(spe, pokemon) {
			if (['raindance', 'primordialsea'].includes(pokemon.effectiveWeather())) {
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Swift Swim",
		rating: 3,
		num: 33,
	},
	symbiosis: {
		onAllyAfterUseItem(item, pokemon) {
			if (pokemon.switchFlag) return;
			const source = this.effectState.target;
			const myItem = source.takeItem();
			if (!myItem) return;
			if (
				!this.singleEvent('TakeItem', myItem, source.itemState, pokemon, source, this.effect, myItem) ||
				!pokemon.setItem(myItem)
			) {
				source.item = myItem.id;
				return;
			}
			this.add('-activate', source, 'ability: Symbiosis', myItem, `[of] ${pokemon}`);
		},
		flags: {},
		name: "Symbiosis",
		rating: 0,
		num: 180,
	},
	synchronize: {
		onAfterSetStatus(status, target, source, effect) {
			if (!source || source === target) return;
			if (effect && effect.id === 'toxicspikes') return;
			if (status.id === 'slp' || status.id === 'frz') return;
			this.add('-activate', target, 'ability: Synchronize');
			// Hack to make status-prevention abilities think Synchronize is a status move
			// and show messages when activating against it.
			source.trySetStatus(status, target, { status: status.id, id: 'synchronize' } as Effect);
		},
		flags: {},
		name: "Synchronize",
		rating: 2,
		num: 28,
	},
	swordofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Sword of Ruin');
		},
		onAnyModifyDef(def, target, source, move) {
			const abilityHolder = this.effectState.target;
			if (target.hasAbility('Sword of Ruin')) return;
			if (!move.ruinedDef?.hasAbility('Sword of Ruin')) move.ruinedDef = abilityHolder;
			if (move.ruinedDef !== abilityHolder) return;
			this.debug('Sword of Ruin Def drop');
			return this.chainModify(0.75);
		},
		flags: {},
		name: "Sword of Ruin",
		rating: 4.5,
		num: 285,
	},
	tabletsofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Tablets of Ruin');
		},
		onAnyModifyAtk(atk, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Tablets of Ruin')) return;
			if (!move.ruinedAtk) move.ruinedAtk = abilityHolder;
			if (move.ruinedAtk !== abilityHolder) return;
			this.debug('Tablets of Ruin Atk drop');
			return this.chainModify(0.75);
		},
		flags: {},
		name: "Tablets of Ruin",
		rating: 4.5,
		num: 284,
	},
	tangledfeet: {
		onModifyAccuracyPriority: -1,
		onModifyAccuracy(accuracy, target) {
			if (typeof accuracy !== 'number') return;
			if (target?.volatiles['confusion']) {
				this.debug('Tangled Feet - decreasing accuracy');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Tangled Feet",
		rating: 1,
		num: 77,
	},
	tanglinghair: {
		onDamagingHit(damage, target, source, move) {
			if (this.checkMoveMakesContact(move, source, target, true)) {
				this.add('-ability', target, 'Tangling Hair');
				this.boost({ spe: -1 }, source, target, null, true);
			}
		},
		flags: {},
		name: "Tangling Hair",
		rating: 2,
		num: 221,
	},
	technician: {
		onBasePowerPriority: 30,
		onBasePower(basePower, attacker, defender, move) {
			const basePowerAfterMultiplier = this.modify(basePower, this.event.modifier);
			this.debug(`Base Power: ${basePowerAfterMultiplier}`);
			if (basePowerAfterMultiplier <= 60) {
				this.debug('Technician boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Technician",
		rating: 3.5,
		num: 101,
	},
	telepathy: {
		onTryHit(target, source, move) {
			if (target !== source && target.isAlly(source) && move.category !== 'Status') {
				this.add('-activate', target, 'ability: Telepathy');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Telepathy",
		rating: 0,
		num: 140,
	},
	teraformzero: {
		onAfterTerastallization(pokemon) {
			if (pokemon.baseSpecies.name !== 'Terapagos-Stellar') return;
			if (this.field.weather || this.field.terrain) {
				this.add('-ability', pokemon, 'Teraform Zero');
				this.field.clearWeather();
				this.field.clearTerrain();
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1 },
		name: "Teraform Zero",
		rating: 3,
		num: 309,
	},
	terashell: {
		// effectiveness implemented in sim/pokemon.ts:Pokemon#runEffectiveness
		// needs two checks to reset between regular moves and future attacks
		onAnyBeforeMove() {
			delete this.effectState.resisted;
		},
		onAnyAfterMove() {
			delete this.effectState.resisted;
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, breakable: 1 },
		name: "Tera Shell",
		rating: 3.5,
		num: 308,
	},
	terashift: {
		onSwitchInPriority: 2,
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Terapagos') return;
			if (pokemon.species.forme !== 'Terastal') {
				this.add('-activate', pokemon, 'ability: Tera Shift');
				pokemon.formeChange('Terapagos-Terastal', this.effect, true);
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1 },
		name: "Tera Shift",
		rating: 3,
		num: 307,
	},
	teravolt: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Teravolt');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		flags: {},
		name: "Teravolt",
		rating: 3,
		num: 164,
	},
	thermalexchange: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Fire') {
				this.boost({ atk: 1 });
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Thermal Exchange');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Thermal Exchange');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Thermal Exchange",
		rating: 2.5,
		num: 270,
	},
	thickfat: {
		onSourceModifyAtkPriority: 6,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Ice' || move.type === 'Fire') {
				this.debug('Thick Fat weaken');
				return this.chainModify(0.5);
			}
		},
		flags: { breakable: 1 },
		name: "Thick Fat",
		rating: 3.5,
		num: 47,
	},
	tintedlens: {
		onModifyDamage(damage, source, target, move) {
			if (target.getMoveHitData(move).typeMod < 0) {
				this.debug('Tinted Lens boost');
				return this.chainModify(2);
			}
		},
		flags: {},
		name: "Tinted Lens",
		rating: 4,
		num: 110,
	},
	torrent: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water' && attacker.hp <= attacker.maxhp / 3) {
				this.debug('Torrent boost');
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Torrent",
		rating: 2,
		num: 67,
	},
	toughclaws: {
		onBasePowerPriority: 21,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['contact']) {
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Tough Claws",
		rating: 3.5,
		num: 181,
	},
	toxicboost: {
		onBasePowerPriority: 19,
		onBasePower(basePower, attacker, defender, move) {
			if ((attacker.status === 'psn' || attacker.status === 'tox') && move.category === 'Physical') {
				return this.chainModify(1.5);
			}
		},
		flags: {},
		name: "Toxic Boost",
		rating: 3,
		num: 137,
	},
	toxicchain: {
		onSourceDamagingHit(damage, target, source, move) {
			// Despite not being a secondary, Shield Dust / Covert Cloak block Toxic Chain's effect
			if (target.hasAbility('shielddust') || target.hasItem('covertcloak')) return;

			if (this.randomChance(3, 10)) {
				target.trySetStatus('tox', source);
			}
		},
		flags: {},
		name: "Toxic Chain",
		rating: 4.5,
		num: 305,
	},
	toxicdebris: {
		onDamagingHit(damage, target, source, move) {
			const side = source.isAlly(target) ? source.side.foe : source.side;
			const toxicSpikes = side.sideConditions['toxicspikes'];
			if (move.category === 'Physical' && (!toxicSpikes || toxicSpikes.layers < 2)) {
				this.add('-activate', target, 'ability: Toxic Debris');
				side.addSideCondition('toxicspikes', target);
			}
		},
		flags: {},
		name: "Toxic Debris",
		rating: 3.5,
		num: 295,
	},
	trace: {
		onStart(pokemon) {
			this.effectState.seek = true;
			// n.b. only affects Hackmons
			// interaction with No Ability is complicated: https://www.smogon.com/forums/threads/pokemon-sun-moon-battle-mechanics-research.3586701/page-76#post-7790209
			if (pokemon.adjacentFoes().some(foeActive => foeActive.ability === 'noability')) {
				this.effectState.seek = false;
			}
			// interaction with Ability Shield is similar to No Ability
			if (pokemon.hasItem('Ability Shield')) {
				this.add('-block', pokemon, 'item: Ability Shield');
				this.effectState.seek = false;
			}
			if (this.effectState.seek) {
				this.singleEvent('Update', this.effect, this.effectState, pokemon);
			}
		},
		onUpdate(pokemon) {
			if (!this.effectState.seek) return;

			const possibleTargets = pokemon.adjacentFoes().filter(
				target => !target.getAbility().flags['notrace'] && target.ability !== 'noability'
			);
			if (!possibleTargets.length) return;

			const target = this.sample(possibleTargets);
			const ability = target.getAbility();
			pokemon.setAbility(ability, target);
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
		name: "Trace",
		rating: 2.5,
		num: 36,
	},
	transistor: {
		onModifyAtkPriority: 5,
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify([5325, 4096]);
			}
		},
		onModifySpAPriority: 5,
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Electric') {
				this.debug('Transistor boost');
				return this.chainModify([5325, 4096]);
			}
		},
		flags: {},
		name: "Transistor",
		rating: 3.5,
		num: 262,
	},
	triage: {
		onModifyPriority(priority, pokemon, target, move) {
			if (move?.flags['heal']) return priority + 3;
		},
		flags: {},
		name: "Triage",
		rating: 3.5,
		num: 205,
	},
	truant: {
		onStart(pokemon) {
			pokemon.removeVolatile('truant');
			if (pokemon.activeTurns && (pokemon.moveThisTurnResult !== undefined || !this.queue.willMove(pokemon))) {
				pokemon.addVolatile('truant');
			}
		},
		onBeforeMovePriority: 9,
		onBeforeMove(pokemon) {
			if (pokemon.removeVolatile('truant')) {
				this.add('cant', pokemon, 'ability: Truant');
				return false;
			}
			pokemon.addVolatile('truant');
		},
		condition: {},
		flags: {},
		name: "Truant",
		rating: -1,
		num: 54,
	},
	turboblaze: {
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Turboblaze');
		},
		onModifyMove(move) {
			move.ignoreAbility = true;
		},
		flags: {},
		name: "Turboblaze",
		rating: 3,
		num: 163,
	},
	unaware: {
		onAnyModifyBoost(boosts, pokemon) {
			const unawareUser = this.effectState.target;
			if (unawareUser === pokemon) return;
			if (unawareUser === this.activePokemon && pokemon === this.activeTarget) {
				boosts['def'] = 0;
				boosts['spd'] = 0;
				boosts['evasion'] = 0;
			}
			if (pokemon === this.activePokemon && unawareUser === this.activeTarget) {
				boosts['atk'] = 0;
				boosts['def'] = 0;
				boosts['spa'] = 0;
				boosts['accuracy'] = 0;
			}
		},
		flags: { breakable: 1 },
		name: "Unaware",
		rating: 4,
		num: 109,
	},
	unburden: {
		onAfterUseItem(item, pokemon) {
			if (pokemon !== this.effectState.target) return;
			pokemon.addVolatile('unburden');
		},
		onTakeItem(item, pokemon) {
			pokemon.addVolatile('unburden');
		},
		onEnd(pokemon) {
			pokemon.removeVolatile('unburden');
		},
		condition: {
			onModifySpe(spe, pokemon) {
				if (!pokemon.item && !pokemon.ignoringAbility()) {
					return this.chainModify(2);
				}
			},
		},
		flags: {},
		name: "Unburden",
		rating: 3.5,
		num: 84,
	},
	unnerve: {
		onSwitchInPriority: 1,
		onStart(pokemon) {
			if (this.effectState.unnerved) return;
			this.add('-ability', pokemon, 'Unnerve');
			this.effectState.unnerved = true;
		},
		onEnd() {
			this.effectState.unnerved = false;
		},
		onFoeTryEatItem() {
			return !this.effectState.unnerved;
		},
		flags: {},
		name: "Unnerve",
		rating: 1,
		num: 127,
	},
	unseenfist: {
		onModifyMove(move) {
			if (move.flags['contact']) delete move.flags['protect'];
		},
		flags: {},
		name: "Unseen Fist",
		rating: 2,
		num: 260,
	},
	vesselofruin: {
		onStart(pokemon) {
			if (this.suppressingAbility(pokemon)) return;
			this.add('-ability', pokemon, 'Vessel of Ruin');
		},
		onAnyModifySpA(spa, source, target, move) {
			const abilityHolder = this.effectState.target;
			if (source.hasAbility('Vessel of Ruin')) return;
			if (!move.ruinedSpA) move.ruinedSpA = abilityHolder;
			if (move.ruinedSpA !== abilityHolder) return;
			this.debug('Vessel of Ruin SpA drop');
			return this.chainModify(0.75);
		},
		flags: {},
		name: "Vessel of Ruin",
		rating: 4.5,
		num: 284,
	},
	victorystar: {
		onAnyModifyAccuracyPriority: -1,
		onAnyModifyAccuracy(accuracy, target, source) {
			if (source.isAlly(this.effectState.target) && typeof accuracy === 'number') {
				return this.chainModify([4506, 4096]);
			}
		},
		flags: {},
		name: "Victory Star",
		rating: 2,
		num: 162,
	},
	vitalspirit: {
		onUpdate(pokemon) {
			if (pokemon.status === 'slp') {
				this.add('-activate', pokemon, 'ability: Vital Spirit');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'slp') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Vital Spirit');
			}
			return false;
		},
		onTryAddVolatile(status, target) {
			if (status.id === 'yawn') {
				this.add('-immune', target, '[from] ability: Vital Spirit');
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Vital Spirit",
		rating: 1.5,
		num: 72,
	},
	voltabsorb: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Electric') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Volt Absorb');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Volt Absorb",
		rating: 3.5,
		num: 10,
	},
	wanderingspirit: {
		onDamagingHit(damage, target, source, move) {
			if (source.getAbility().flags['failskillswap'] || target.volatiles['dynamax']) return;

			if (this.checkMoveMakesContact(move, source, target)) {
				const targetCanBeSet = this.runEvent('SetAbility', target, source, this.effect, source.ability);
				if (!targetCanBeSet) return targetCanBeSet;
				const sourceAbility = source.setAbility('wanderingspirit', target);
				if (!sourceAbility) return;
				if (target.isAlly(source)) {
					this.add('-activate', target, 'Skill Swap', '', '', `[of] ${source}`);
				} else {
					this.add('-activate', target, 'ability: Wandering Spirit', this.dex.abilities.get(sourceAbility).name, 'Wandering Spirit', `[of] ${source}`);
				}
				target.setAbility(sourceAbility);
			}
		},
		flags: {},
		name: "Wandering Spirit",
		rating: 2.5,
		num: 254,
	},
	waterabsorb: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Water') {
				if (!this.heal(target.baseMaxhp / 4)) {
					this.add('-immune', target, '[from] ability: Water Absorb');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Water Absorb",
		rating: 3.5,
		num: 11,
	},
	waterbubble: {
		onSourceModifyAtkPriority: 5,
		onSourceModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onSourceModifySpAPriority: 5,
		onSourceModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Fire') {
				return this.chainModify(0.5);
			}
		},
		onModifyAtk(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onModifySpA(atk, attacker, defender, move) {
			if (move.type === 'Water') {
				return this.chainModify(2);
			}
		},
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Bubble');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Bubble');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Water Bubble",
		rating: 4.5,
		num: 199,
	},
	watercompaction: {
		onDamagingHit(damage, target, source, move) {
			if (move.type === 'Water') {
				this.boost({ def: 2 });
			}
		},
		flags: {},
		name: "Water Compaction",
		rating: 1.5,
		num: 195,
	},
	waterveil: {
		onUpdate(pokemon) {
			if (pokemon.status === 'brn') {
				this.add('-activate', pokemon, 'ability: Water Veil');
				pokemon.cureStatus();
			}
		},
		onSetStatus(status, target, source, effect) {
			if (status.id !== 'brn') return;
			if ((effect as Move)?.status) {
				this.add('-immune', target, '[from] ability: Water Veil');
			}
			return false;
		},
		flags: { breakable: 1 },
		name: "Water Veil",
		rating: 2,
		num: 41,
	},
	weakarmor: {
		onDamagingHit(damage, target, source, move) {
			if (move.category === 'Physical') {
				this.boost({ def: -1, spe: 2 }, target, target);
			}
		},
		flags: {},
		name: "Weak Armor",
		rating: 1,
		num: 133,
	},
	wellbakedbody: {
		onTryHit(target, source, move) {
			if (target !== source && move.type === 'Fire') {
				if (!this.boost({ def: 2 })) {
					this.add('-immune', target, '[from] ability: Well-Baked Body');
				}
				return null;
			}
		},
		flags: { breakable: 1 },
		name: "Well-Baked Body",
		rating: 3.5,
		num: 273,
	},
	whitesmoke: {
		onTryBoost(boost, target, source, effect) {
			if (source && target === source) return;
			let showMsg = false;
			let i: BoostID;
			for (i in boost) {
				if (boost[i]! < 0) {
					delete boost[i];
					showMsg = true;
				}
			}
			if (showMsg && !(effect as ActiveMove).secondaries && effect.id !== 'octolock') {
				this.add("-fail", target, "unboost", "[from] ability: White Smoke", `[of] ${target}`);
			}
		},
		flags: { breakable: 1 },
		name: "White Smoke",
		rating: 2,
		num: 73,
	},
	wimpout: {
		onEmergencyExit(target) {
			if (!this.canSwitch(target.side) || target.forceSwitchFlag || target.switchFlag) return;
			for (const side of this.sides) {
				for (const active of side.active) {
					active.switchFlag = false;
				}
			}
			target.switchFlag = true;
			this.add('-activate', target, 'ability: Wimp Out');
		},
		flags: {},
		name: "Wimp Out",
		rating: 1,
		num: 193,
	},
	windpower: {
		onDamagingHitOrder: 1,
		onDamagingHit(damage, target, source, move) {
			if (move.flags['wind']) {
				target.addVolatile('charge');
			}
		},
		onSideConditionStart(side, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				pokemon.addVolatile('charge');
			}
		},
		flags: {},
		name: "Wind Power",
		rating: 1,
		num: 277,
	},
	windrider: {
		onStart(pokemon) {
			if (pokemon.side.sideConditions['tailwind']) {
				this.boost({ atk: 1 }, pokemon, pokemon);
			}
		},
		onTryHit(target, source, move) {
			if (target !== source && move.flags['wind']) {
				if (!this.boost({ atk: 1 }, target, target)) {
					this.add('-immune', target, '[from] ability: Wind Rider');
				}
				return null;
			}
		},
		onSideConditionStart(side, source, sideCondition) {
			const pokemon = this.effectState.target;
			if (sideCondition.id === 'tailwind') {
				this.boost({ atk: 1 }, pokemon, pokemon);
			}
		},
		flags: { breakable: 1 },
		name: "Wind Rider",
		rating: 3.5,
		// We do not want Brambleghast to get Infiltrator in Randbats
		num: 274,
	},
	wonderguard: {
		onTryHit(target, source, move) {
			if (target === source || move.category === 'Status' || move.type === '???' || move.id === 'struggle') return;
			if (move.id === 'skydrop' && !source.volatiles['skydrop']) return;
			this.debug('Wonder Guard immunity: ' + move.id);
			if (target.runEffectiveness(move) <= 0 || !target.runImmunity(move)) {
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-immune', target, '[from] ability: Wonder Guard');
				}
				return null;
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, failskillswap: 1, breakable: 1 },
		name: "Wonder Guard",
		rating: 5,
		num: 25,
	},
	wonderskin: {
		onModifyAccuracyPriority: 10,
		onModifyAccuracy(accuracy, target, source, move) {
			if (move.category === 'Status' && typeof accuracy === 'number') {
				this.debug('Wonder Skin - setting accuracy to 50');
				return 50;
			}
		},
		flags: { breakable: 1 },
		name: "Wonder Skin",
		rating: 2,
		num: 147,
	},
	zenmode: {
		onResidualOrder: 29,
		onResidual(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Darmanitan' || pokemon.transformed) {
				return;
			}
			if (pokemon.hp <= pokemon.maxhp / 2 && !['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode');
			} else if (pokemon.hp > pokemon.maxhp / 2 && ['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
				pokemon.addVolatile('zenmode'); // in case of base Darmanitan-Zen
				pokemon.removeVolatile('zenmode');
			}
		},
		onEnd(pokemon) {
			if (!pokemon.volatiles['zenmode'] || !pokemon.hp) return;
			pokemon.transformed = false;
			delete pokemon.volatiles['zenmode'];
			if (pokemon.species.baseSpecies === 'Darmanitan' && pokemon.species.battleOnly) {
				pokemon.formeChange(pokemon.species.battleOnly as string, this.effect, false, '0', '[silent]');
			}
		},
		condition: {
			onStart(pokemon) {
				if (!pokemon.species.name.includes('Galar')) {
					if (pokemon.species.id !== 'darmanitanzen') pokemon.formeChange('Darmanitan-Zen');
				} else {
					if (pokemon.species.id !== 'darmanitangalarzen') pokemon.formeChange('Darmanitan-Galar-Zen');
				}
			},
			onEnd(pokemon) {
				if (['Zen', 'Galar-Zen'].includes(pokemon.species.forme)) {
					pokemon.formeChange(pokemon.species.battleOnly as string);
				}
			},
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
		name: "Zen Mode",
		rating: 0,
		num: 161,
	},
	zerotohero: {
		onSwitchOut(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin') return;
			if (pokemon.species.forme !== 'Hero') {
				pokemon.formeChange('Palafin-Hero', this.effect, true);
			}
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies !== 'Palafin') return;
			if (!this.effectState.heroMessageDisplayed && pokemon.species.forme === 'Hero') {
				this.add('-activate', pokemon, 'ability: Zero to Hero');
				this.effectState.heroMessageDisplayed = true;
			}
		},
		flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1, notransform: 1 },
		name: "Zero to Hero",
		rating: 5,
		num: 278,
	},

	// CAP
	mountaineer: {
		onDamage(damage, target, source, effect) {
			if (effect && effect.id === 'stealthrock') {
				return false;
			}
		},
		onTryHit(target, source, move) {
			if (move.type === 'Rock' && !target.activeTurns) {
				this.add('-immune', target, '[from] ability: Mountaineer');
				return null;
			}
		},
		isNonstandard: "CAP",
		flags: { breakable: 1 },
		name: "Mountaineer",
		rating: 3,
		num: -1,
	},
	rebound: {
		isNonstandard: "CAP",
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (this.effectState.target.activeTurns) return;

			if (target === source || move.hasBounced || !move.flags['reflectable'] || target.isSemiInvulnerable()) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, { target: source });
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (this.effectState.target.activeTurns) return;

			if (target.isAlly(source) || move.hasBounced || !move.flags['reflectable'] || target.isSemiInvulnerable()) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, { target: source });
			move.hasBounced = true; // only bounce once in free-for-all battles
			return null;
		},
		flags: { breakable: 1 },
		name: "Rebound",
		rating: 3,
		num: -2,
	},
	persistent: {
		isNonstandard: "CAP",
		// implemented in the corresponding move
		flags: {},
		name: "Persistent",
		rating: 3,
		num: -3,
	},
};
